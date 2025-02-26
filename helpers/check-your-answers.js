const { toCamelCaseWithRows, formatLabel: formatLabelText, replaceAcronyms } = require('./text-helper')
const { combineDateFields } = require('./date-fields')
const sanitizeHtml = require('sanitize-html')
const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ACRONYMS_TO_UPPERCASE: acronyms,
  CHECK_YOUR_ANSWERS_LABEL_MAPPING
} = require('../config')

const mappedLabels = Object.keys(CHECK_YOUR_ANSWERS_LABEL_MAPPING)
const hrefRoot = '/get-involved/add-new-component'
const maxWords = 10

const formatLabel = ( text ) => {
  if(mappedLabels.includes(text)) {
    return CHECK_YOUR_ANSWERS_LABEL_MAPPING[text]
  }
  return formatLabelText(text)
}

const shareYourDetails = {
  addNameToComponentPage:
    'Add name and email address to component page',
  addTeamNameWhenRequested:
    'Only share name and email when requested',
  doNotSharePersonalDetails: 'Do not share personal details'
}

const shareYourDetailsKeys = Object.keys(shareYourDetails)

const truncateText = (text, maxWords) => {
  try {
    const words = String(text).split(' ')
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...'
    }
    return text
  } catch (e) {
    console.error('oh no', e) // todo better error needed!
  }
}

const sanitizeText = (text) => {
  return sanitizeHtml(String(text), {
    allowedTags: [],
    allowedAttributes: {}
  })
}

const answersFromSession = (forms, canRemove, session, ignoreFields) => {
  return forms.reduce((acc, form) => {
    if (Array.isArray(form)) {
      const topLevelKey = toCamelCaseWithRows(form[0])
      acc[topLevelKey] = form.flatMap((field) =>
        extractFieldData(field, session, canRemove, ignoreFields)
      )
    } else {
      const key = toCamelCaseWithRows(form)
      acc[key] = extractFieldData(form, session, canRemove, ignoreFields)
    }
    return acc
  }, {})
}

const listHTML = (values) => {
  if (!Array.isArray(values)) return ''

  const listItems = values.map((value) => `<li>${value}</li>`).join('')
  return `<ul>${listItems}</ul>`
}

const shareYourDetailsValueReplacement = (value) => {
  const values = Array.isArray(value) ? value : [value]
  return listHTML(
    values.map((value) => {
      if (shareYourDetailsKeys.includes(value)) {
        return shareYourDetails[value]
      } else {
        return value
      }
    })
  )
}

const extractFieldData = (field, session, canRemove = [], ignoreFields = []) => {
  const fieldName = field
  const fieldPath = `/${field}`

  // Remove ignored fields
  const parsedSession = Object.entries(session).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      ignoreFields.forEach((ignoreField) => {
        if (value.hasOwnProperty(ignoreField)) {
          delete value[ignoreField]
        }
      })
    }
    acc[key] = value
    return acc
  }, {})

  // Collect all entries that match the field pattern (e.g., /foo, /foo/1, /foo/2)
  const fieldPattern = new RegExp(`^${fieldPath}(?:/\\d+)?$`)
  const matchingEntries = Object.entries(parsedSession).filter(([key]) =>
    fieldPattern.test(key)
  )

  if (matchingEntries.length === 0) return []

  return matchingEntries.flatMap(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // multiple entries
      const values = combineDateFields(value)
      let removeAdded = false
      return Object.entries(values).map(([subKey, subValue]) => {
        const actionItems = []
        const isShareYourDetails = subKey === 'shareYourDetails'
        const displayValue = {
          value: {}
        }
        if (isShareYourDetails) {
          displayValue.value.html = shareYourDetailsValueReplacement(subValue)
        } else if (subValue.hasOwnProperty('originalname')) {
          displayValue.value.text = subValue.originalname
        } else {
          displayValue.value.text = sanitizeText(
            truncateText(subValue, maxWords)
          )
        }

        if(canRemove.includes(key) && !removeAdded) {
          removeAdded = true
          actionItems.push({
            href: `${hrefRoot}/remove${key}`,
            text: 'Remove',
            visuallyHiddenText:
                formatLabel(fieldName) + ' - ' + formatLabel(subKey)
          })
        }

        actionItems.push({
          href: `${hrefRoot}${key}`,
          text: 'Change',
          visuallyHiddenText:
              formatLabel(fieldName) + ' - ' + formatLabel(subKey)
        })

        return {
          key: { text: replaceAcronyms(formatLabel(subKey), acronyms) },
          ...displayValue,
          actions: {
            items: actionItems
          }
        }
      })
    } else {

      const actionItems = []

      if(canRemove.includes(key)) {
        actionItems.push({
          href: `${hrefRoot}/remove${key}`,
          text: 'Remove',
          visuallyHiddenText: replaceAcronyms(formatLabel(fieldName), acronyms)
        })
      }

      actionItems.push({
        href: `${hrefRoot}${key}`,
        text: 'Change',
        visuallyHiddenText: replaceAcronyms(formatLabel(fieldName), acronyms)
      })

      // single entry
      return [
        {
          key: { text: replaceAcronyms(formatLabel(fieldName), acronyms) },
          value: { text: sanitizeText(truncateText(value, maxWords)) },
          actions: {
            items: actionItems
          }
        }
      ]
    }
  })
}

const checkYourAnswers = (session) => {
  const forms = [
      'component-details',
      'component-image',
      'add-external-audit',
      'add-internal-audit',
      'add-assistive-tech',
      ['prototype', 'prototype-url'],
      ['figma', 'figma-link'],
      ['component-code', 'component-code-details'],
      'your-details'
  ]
  const canRemoveStatic = [
      '/component-image',
      '/accessibility-findings',
      '/prototype-url',
      '/figma-link',
      '/component-code-details',
      '/add-external-audit',
      '/add-internal-audit',
      '/add-assistive-tech'
  ]
  const canRemoveMultiples = [
      '/prototype-url',
      '/figma-link',
      '/component-code-details'
  ]
  const ignoreFields = [
      'componentPrototypeUrl',
      'figmaUrl',
      'componentCodeAvailable'
  ]
  const canRemove = [
    ...canRemoveStatic,
    ...canRemoveMultiples.flatMap(item =>
        Array.from({ length: maxAddAnother }, (_, i) => `${item}/${i + 1}`)
    )
  ]
  return answersFromSession(forms, canRemove, session, ignoreFields)
}
module.exports = checkYourAnswers
