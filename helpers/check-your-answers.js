const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ACRONYMS_TO_UPPERCASE: acronyms,
  CHECK_YOUR_ANSWERS_LABEL_OVERRIDES: labelOverrides,
  SHARE_YOUR_DETAILS: shareYourDetails,
  CHECK_YOUR_ANSWERS: checkYourAnswersConfig,
  COMPONENT_FORM_PAGES: formPages,
  ADD_NEW_COMPONENT_ROUTE: hrefRoot
} = require('../config')

const { combineDateFields } = require('./date-fields')
const {
  humanReadableLabel: humanReadableLabelText,
  replaceAcronyms,
  truncateText,
  sanitizeText,
  ucFirst
} = require('./text-helper')

const maxWords = 10000
// const shareYourDetailsKeys = Object.keys(shareYourDetails)

/**
 * Converts a text label to a human-readable format using a predefined mapping.
 *
 * @param {string} field - The camelCase field to get a label for.
 * @param {string} form - The form/page that contains the field
 * @returns {string} - The human-readable label.
 */
const humanReadableLabel = (field, form = '') => {
  // If there's an override, use that
  if (Object.keys(labelOverrides).includes(field)) {
    return labelOverrides[field]
  }
  // Otherwise use the label from the form pages config
  if (form) {
    if (formPages[form]?.fields[field]?.label) {
      return formPages[form]?.fields[field]?.label
    }
  }
  // Else just convert the camelCase to human
  return humanReadableLabelText(field)
}

/**
 * Extracts and formats answers from session data based on provided forms.
 *
 * @param {Array} data - The forms and config to extract answers from.
 * @param {object} session - The session data.
 * @param {Array} canRemove - The fields that can be removed via a UI action.
 * @returns {object} - The formatted answers for govukSummaryList.
 */
const answersFromSession = (data, session, canRemove) => {
  const answers = []
  const defaultConfig = { removableFields: canRemove }
  data.forEach((form) => {
    console.log(form)
    if (typeof form === 'object') {
      console.log('form is an object')
      for (const [formName, formConfig] of Object.entries(form)) {
        console.log(formConfig)
        const config = Object.assign({}, defaultConfig, formConfig)
        console.log(config)
        answers.push(...extractFieldData(formName, session, config))
      }
    } else {
      answers.push(...extractFieldData(form, session, defaultConfig))
    }
  })
  console.log(answers)
  return answers
}

/**
 * Converts an array of values into an HTML list.
 *
 * @param {Array} values - The values to convert.
 * @returns {string} - The HTML list.
 */
const listHTML = (values) => {
  if (!Array.isArray(values)) return ''

  const listItems = values.map((value) => `<li>${value}</li>`).join('')
  return `<ul>${listItems}</ul>`
}

/**
 * Replaces specific values in the session data with predefined values.
 *
 * @param {string|Array} value - The value(s) to replace.
 * @returns {string} - The replaced value(s) as an HTML list.
 */
const shareYourDetailsValueReplacement = (value) => {
  let values = Array.isArray(value) ? value : [value]
  values = values.filter((v) => v) // Remove empty values

  if(values.length === 0) {
    return "Do not share my details"
  }

  return listHTML(
    Object.entries(shareYourDetails).map(([key, value]) => {
      return ucFirst(`${(!values.includes(key) ? 'do not ' : '')}${value}`)
    })
  )
}

/**
 * Extracts and formats data for a specific field from the session.
 *
 * @param {string} field - The field to extract data for.
 * @param {object} session - The session data.
 * @param {object} options - The options for extraction
 * @returns {Array} - The extracted and formatted field data.
 */
// TODO: We don't need the whole session here! only the form we;re extracting
// for.
// TODO: Rename this function - extracFieldDataFromForm(form, session, options)
const extractFieldData = (field, session, options = {}) => {
  const defaults = {
    removableFields: [],
    excludeFields: [],
    includeFields: []
  }
  const opts = Object.assign({}, defaults, options)
  console.log(opts)
  const fieldName = field
  const fieldPath = `/${field}`
  console.log(`extracting field data for: ${fieldName}`)

  let parsedSession = {}

  if (opts.includeFields.length > 0) {
    console.log('only including specified fields')
    for (const [key, value] of Object.entries(session)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.keys(value).forEach(function (field) {
          console.log(field)
          console.log(opts.includeFields)
          if (opts.includeFields.includes(field)) {
            console.log('field should be included')
            parsedSession[key] = {}
            parsedSession[key][field] = value[field]
          }
        })
      }
    }
  } else {
    console.log('using whole session')
    parsedSession = Object.assign({}, session)
  }

  // Remove excluded fields from session data
  if (opts.excludeFields.length > 0) {
    console.log('excluding fields')
    parsedSession = Object.entries(parsedSession).reduce(
      (acc, [key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value)) {
          opts.excludeFields.forEach((excludeField) => {
            if (value && typeof value === 'object' && excludeField in value) {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete value[excludeField]
            }
          })
        }
        acc[key] = value
        return acc
      },
      {}
    )
  }

  // console.log(parsedSession)

  // Collect all entries that match the field pattern (e.g., /foo, /foo/1, /foo/2)
  const fieldPattern = new RegExp(`^${fieldPath}(?:/\\d+)?$`)
  const matchingEntries = Object.entries(parsedSession).filter(([key]) =>
    fieldPattern.test(key)
  )

  let codeLanguageIsOther = false;

  if (matchingEntries.length === 0) return []

  return matchingEntries.flatMap(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // Handle multiple entries
      const values = combineDateFields(value)
      let removeAdded = false
      return Object.entries(values).map(([subKey, subValue]) => {
        const actionItems = []
        const displayValue = {
          value: {}
        }

        // Don't include code language if language is other
        if( subKey === 'componentCodeLanguage' && subValue === 'other') {
          codeLanguageIsOther = true
          return null
        }

        // Only include other language value if `componentCodeLanguage` is
        // set to 'other'
        if(subKey === 'componentCodeLanguageOther' && !codeLanguageIsOther) {
          return null
        }

        if (subKey === 'shareYourDetails') {
          displayValue.value.html = shareYourDetailsValueReplacement(subValue)
        } else if(subKey === 'componentCodeLanguage' || subKey === 'componentCodeLanguageOther') {
          displayValue.value.text = 'Code provided'
        } else if (
          subValue &&
          typeof subValue === 'object' &&
          'originalname' in subValue
        ) {
          displayValue.value.text = subValue.originalname
        } else {
          displayValue.value.text = sanitizeText(
            truncateText(subValue, maxWords)
          )
        }

        console.log(`display value: ${displayValue.value.text}`)

        if (opts.removableFields.includes(key) && !removeAdded) {
          removeAdded = true
          actionItems.push({
            href: `${hrefRoot}/remove${key}`,
            text: 'Remove',
            visuallyHiddenText: `${humanReadableLabel(fieldName)} - ${humanReadableLabel(subKey, fieldName)}`
          })
        }

        actionItems.push({
          href: `${hrefRoot}${key}`,
          text: ((subKey === 'componentCode') ? 'Review & Change' : 'Change'),
          visuallyHiddenText: `${humanReadableLabel(fieldName)} - ${humanReadableLabel(subKey, fieldName)}`
        })

        console.log(
          `display key: ${formPages[fieldName]?.fields[subKey]?.label}`
        )

        return {
          key: { text: humanReadableLabel(subKey, fieldName) },
          ...displayValue,
          actions: {
            items: actionItems
          }
        }
      })
    }

    const actionItems = []

    if (opts.removableFields.includes(key)) {
      actionItems.push({
        href: `${hrefRoot}/remove${key}`,
        text: 'Remove',
        visuallyHiddenText: replaceAcronyms(
          humanReadableLabel(fieldName),
          acronyms
        )
      })
    }

    actionItems.push({
      href: `${hrefRoot}${key}`,
      text: 'Change',
      visuallyHiddenText: replaceAcronyms(
        humanReadableLabel(fieldName),
        acronyms
      )
    })

    // Handle single entry
    return [
      {
        key: { text: replaceAcronyms(humanReadableLabel(fieldName), acronyms) },
        value: { text: sanitizeText(truncateText(value, maxWords)) },
        actions: {
          items: actionItems
        }
      }
    ]
  }).filter((entry) => entry)
}

/**
 * Main function that processes the session data and returns formatted answers for govukSummaryList.
 *
 * @param {object} session - The session data.
 * @returns {object} - The formatted answers.
 */
const checkYourAnswers = (session) => {
  const {
    sections, // The sections for the CYA page
    canRemoveStatic, // The fields that can be removed via a UI action
    canRemoveMultiples // The fields that can be removed via a UI action (where we have dyamically multiple versions)
  } = checkYourAnswersConfig

  // Generate a list of fields that can be removed
  const canRemove = [
    ...canRemoveStatic,
    ...canRemoveMultiples.flatMap((item) =>
      Array.from({ length: maxAddAnother }, (_, i) => `${item}/${i + 1}`)
    )
  ]

  const answers = []
  sections.forEach((section) => {
    answers.push({
      title: section.title,
      answers: answersFromSession(section.data, session, canRemove)
    })
  })
  // console.log(answers)
  return answers
}

module.exports = checkYourAnswers
