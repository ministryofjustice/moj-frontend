const {
  MAX_ADD_ANOTHER: maxAddAnother,
  ACRONYMS_TO_UPPERCASE: acronyms,
  CHECK_YOUR_ANSWERS_LABEL_MAPPING,
  SHARE_YOUR_DETAILS: shareYourDetails,
  CHECK_YOUR_ANSWERS: checkYourAnswersConfig,
  ADD_NEW_COMPONENT_ROUTE: hrefRoot
} = require('../config')

const { combineDateFields } = require('./date-fields')
const {
  toCamelCaseWithRows,
  humanReadableLabel: humanReadableLabelText,
  replaceAcronyms,
  truncateText,
  sanitizeText
} = require('./text-helper')

const mappedLabels = Object.keys(CHECK_YOUR_ANSWERS_LABEL_MAPPING)
const maxWords = 10000
const shareYourDetailsKeys = Object.keys(shareYourDetails)

/**
 * Converts a text label to a human-readable format using a predefined mapping.
 *
 * @param {string} text - The text label to convert.
 * @returns {string} - The human-readable label.
 */
const humanReadableLabel = (text) => {
  if (mappedLabels.includes(text)) {
    return CHECK_YOUR_ANSWERS_LABEL_MAPPING[text]
  }
  return humanReadableLabelText(text)
}

/**
 * Extracts and formats answers from session data based on provided forms.
 *
 * @param {Array} forms - The forms to extract answers from.
 * @param {Array} canRemove - The fields that can be removed via a UI action.
 * @param {object} session - The session data.
 * @param {Array} ignoreFields - The fields to ignore.
 * @returns {object} - The formatted answers for govukSummaryList.
 */
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
  const values = Array.isArray(value) ? value : [value]
  return listHTML(
    values.map((value) => {
      if (shareYourDetailsKeys.includes(value)) {
        return shareYourDetails[value]
      }
      return value
    })
  )
}

/**
 * Extracts and formats data for a specific field from the session.
 *
 * @param {string} field - The field to extract data for.
 * @param {object} session - The session data.
 * @param {Array} [canRemove] - The fields that can be removed.
 * @param {Array} [ignoreFields] - The fields to ignore.
 * @returns {Array} - The extracted and formatted field data.
 */
const extractFieldData = (
  field,
  session,
  canRemove = [],
  ignoreFields = []
) => {
  const fieldName = field
  const fieldPath = `/${field}`

  // Remove ignored fields from session data
  const parsedSession = Object.entries(session).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      ignoreFields.forEach((ignoreField) => {
        if (value && typeof value === 'object' && ignoreField in value) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
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
      // Handle multiple entries
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

        if (canRemove.includes(key) && !removeAdded) {
          removeAdded = true
          actionItems.push({
            href: `${hrefRoot}/remove${key}`,
            text: 'Remove',
            visuallyHiddenText: `${humanReadableLabel(fieldName)} - ${humanReadableLabel(subKey)}`
          })
        }

        actionItems.push({
          href: `${hrefRoot}${key}`,
          text: 'Change',
          visuallyHiddenText: `${humanReadableLabel(fieldName)} - ${humanReadableLabel(subKey)}`
        })

        return {
          key: { text: replaceAcronyms(humanReadableLabel(subKey), acronyms) },
          ...displayValue,
          actions: {
            items: actionItems
          }
        }
      })
    }

    const actionItems = []

    if (canRemove.includes(key)) {
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
  })
}

/**
 * Main function that processes the session data and returns formatted answers for govukSummaryList.
 *
 * @param {object} session - The session data.
 * @returns {object} - The formatted answers.
 */
const checkYourAnswers = (session) => {
  const {
    forms, // The forms to extract answers from
    canRemoveStatic, // The fields that can be removed via a UI action
    canRemoveMultiples, // The fields that can be removed via a UI action (where we have dyamically multiple versions)
    ignoreFields // The fields to ignore i.e. not to display in the check your answers
  } = checkYourAnswersConfig

  // Generate a list of fields that can be removed
  const canRemove = [
    ...canRemoveStatic,
    ...canRemoveMultiples.flatMap((item) =>
      Array.from({ length: maxAddAnother }, (_, i) => `${item}/${i + 1}`)
    )
  ]
  const answers = answersFromSession(forms, canRemove, session, ignoreFields)
  if (answers.componentImageRows) {
    answers.componentDetailsRows = answers.componentDetailsRows || []
    answers.componentDetailsRows = [
      ...answers.componentDetailsRows,
      ...answers.componentImageRows
    ]
  }
  return answers
}

module.exports = checkYourAnswers
