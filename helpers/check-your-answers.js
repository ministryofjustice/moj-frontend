const {
  CHECK_YOUR_ANSWERS_LABEL_OVERRIDES: labelOverrides,
  SHARE_YOUR_DETAILS: shareYourDetails,
  COMPONENT_FORM_PAGES: formPages,
  ADD_NEW_COMPONENT_ROUTE: hrefRoot
} = require('../config')

const { combineDateFields } = require('./date-fields')
const {
  humanReadableLabel,
  truncateText,
  sanitizeText,
  ucFirst
} = require('./text-helper')

const maxWords = 10000

/**
 * Converts a text label to a human-readable format using a predefined mapping.
 *
 * @param {string} field - The camelCase field to get a label for.
 * @param {string} section - The form/section that contains the field
 * @returns {string} - The human-readable label.
 */
const labelForField = (field, section = '') => {
  // If there's an override, use that
  if (Object.keys(labelOverrides).includes(field)) {
    return labelOverrides[field]
  }
  // Otherwise use the label from the form pages config
  if (section) {
    const label = formPages[section]?.fields[field]?.label
    if (label) {
      return label
    }
  }
  // Else just convert the camelCase to human
  return humanReadableLabel(field)
}

/**
 * Converts an array of values into an HTML list.
 *
 * @param {Array} arr - The values to convert.
 * @returns {string} - The HTML list.
 */
const arrayToUnorderedList = (arr) => {
  if (!Array.isArray(arr)) return ''

  const listItems = arr.map((item) => `<li>${item}</li>`).join('')
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

  if (values.length === 0) {
    return 'Do not share my details'
  }

  return arrayToUnorderedList(
    Object.entries(shareYourDetails).map(([key, value]) => {
      return ucFirst(`${!values.includes(key) ? 'do not ' : ''}${value}`)
    })
  )
}

/**
 * Gets all sections that should be included in the cya page
 *
 * @param {Array} sessionPages - keys for the pages present in the session
 * @returns {object}
 */
const getSections = (sessionPages) => {
  const sections = {}
  Object.entries(formPages).forEach(([section, config]) => {
    if (config.showOnCya) {
      if (config.multiple) {
        // gather all subpages
        sessionPages
          .filter((key) => key.startsWith(`/${section}`))
          .map((entry) => entry.slice(1)) // remove leading '/'
          .forEach((repeatSection, index) => {
            sections[repeatSection] = buildSection(
              repeatSection,
              config,
              index + 1
            )
          })
      } else {
        sections[section] = buildSection(section, config)
      }
    }
  })
  return sections
}

const buildSection = (sectionKey, sectionConfig, sectionNumber) => {
  const section = {
    title: `${sectionConfig.title}${sectionNumber ? ` ${sectionNumber}` : ''}`,
    actions: [],
    section: []
  }

  if (sectionConfig.removable) {
    section.actions.push({
      href: `${hrefRoot}/remove/${sectionKey}`,
      text: 'Remove',
      visuallyHiddenText: section.title
    })
  }

  section.actions.push({
    href: `${hrefRoot}/${sectionKey}`,
    text: sectionKey.startsWith('component-code') ? 'Review & Change' : 'Change',
    visuallyHiddenText: section.title
  })

  return section
}

const getAnswersForSection = (sectionKey, sessionData = {}) => {
  let codeLanguageIsOther = false
  const data = combineDateFields(sessionData)

  return Object.entries(data).map(([questionKey, answerValue]) => {
    const displayValue = {
      value: {}
    }

    // Don't include code language if language is other
    if (questionKey === 'componentCodeLanguage' && answerValue === 'other') {
      codeLanguageIsOther = true
      return null
    }

    // Only include other language value if `componentCodeLanguage` is set to 'other'
    if (questionKey === 'componentCodeLanguageOther' && !codeLanguageIsOther) {
      return null
    }

    if (questionKey === 'shareYourDetails') {
      displayValue.value.html = shareYourDetailsValueReplacement(answerValue)
    } else if (questionKey === 'componentCode') {
      displayValue.value.text = 'Code provided'
    } else if (
      answerValue &&
      typeof answerValue === 'object' &&
      'originalname' in answerValue
    ) {
      displayValue.value.text = answerValue.originalname
    } else {
      displayValue.value.text = sanitizeText(
        truncateText(answerValue, maxWords)
      )
    }

    return {
      key: { text: labelForField(questionKey, sectionKey) },
      ...displayValue
    }
  })
}

/**
 * Main function that processes the session data and returns formatted answers for govukSummaryList.
 *
 * @param {object} session - The session data.
 * @returns {object} - The formatted answers.
 */
const checkYourAnswers = (session) => {
  const sessionPages = Object.keys(session)
  const sections = getSections(sessionPages)

  Object.entries(sections).forEach(([key, section]) => {
    section.answerRows = getAnswersForSection(key, session[`/${key}`])
  })

  return Object.values(sections)
}

module.exports = checkYourAnswers
