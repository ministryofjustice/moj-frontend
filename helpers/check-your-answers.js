const { toCamelCaseWithRows, formatLabel } = require('./text-helper')
const sanitizeHtml = require('sanitize-html')

const hrefRoot = '/get-involved/add-new-component'
const maxWords = 10

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

const answersFromSession = (forms, canRemove, session) => {
  return forms.reduce((acc, form) => {
    if (Array.isArray(form)) {
      const topLevelKey = toCamelCaseWithRows(form[0])
      const canRemoveTopLevel = canRemove.includes(form[0])
      acc[topLevelKey] = form.flatMap((field) =>
        extractFieldData(field, session, canRemoveTopLevel)
      )
    } else {
      const key = toCamelCaseWithRows(form)
      const canRemoveKey = canRemove.includes(form)
      acc[key] = extractFieldData(form, session, canRemoveKey)
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

const extractFieldData = (field, session, canRemove = false) => {
  const fieldName = field
  const fieldPath = `/${field}`

  // Collect all entries that match the field pattern (e.g., /foo, /foo/1, /foo/2)
  const fieldPattern = new RegExp(`^${fieldPath}(?:/\\d+)?$`)
  const matchingEntries = Object.entries(session).filter(([key]) =>
    fieldPattern.test(key)
  )

  if (matchingEntries.length === 0) return []

  return matchingEntries.flatMap(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // multiple entries
      return Object.entries(value).map(([subKey, subValue]) => {
        const actionItems = []
        const isShareYourDetails = subKey === 'shareYourDetails'
        const displayValue = {
          value: {}
        }
        if (isShareYourDetails) {
          displayValue.value.html = shareYourDetailsValueReplacement(subValue)
        } else {
          displayValue.value.text = sanitizeText(
            truncateText(subValue, maxWords)
          )
        }

        actionItems.push({
          href: `${hrefRoot}${key}`,
          text: 'Change',
          visuallyHiddenText:
              formatLabel(fieldName) + ' - ' + formatLabel(subKey)
        })

        if(canRemove) {
          actionItems.push({
            href: `${hrefRoot}/remove${key}`,
            text: 'Remove',
            visuallyHiddenText:
                formatLabel(fieldName) + ' - ' + formatLabel(subKey)
          })
        }

        return {
          key: { text: formatLabel(subKey) },
          ...displayValue,
          actions: {
            items: actionItems
          }
        }
      })
    } else {

      const actionItems = []

      actionItems.push({
        href: `${hrefRoot}${key}`,
        text: 'Change',
        visuallyHiddenText: formatLabel(fieldName)
      })

      if(canRemove) {
        actionItems.push({
          href: `${hrefRoot}/remove${key}`,
          text: 'Remove',
          visuallyHiddenText: formatLabel(fieldName)
        })
      }

      // single entry
      return [
        {
          key: { text: formatLabel(fieldName) },
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
    ['accessibility-findings'],
    ['prototype', 'prototype-url'],
    ['component-code', 'component-code-details'],
    'your-details'
  ]
  const canRemove = [
    'component-image',
    'accessibility-findings',
    'prototype',
    'component-code'
  ]
  return answersFromSession(forms, canRemove, session)
}
module.exports = checkYourAnswers
