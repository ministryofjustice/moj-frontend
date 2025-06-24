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
let currentSession

/**
 * Converts a text label to a human-readable format using a predefined mapping.
 *
 * @param {string} field - The camelCase field to get a label for.
 * @param {string} section - The form/section that contains the field
 * @returns {string} - The human-readable label.
 */
const labelForField = (field, section) => {
  // If there's an override, use that
  const override = labelOverrides[section]?.fields[field]
  if (override) {
    return override
  }
  // Otherwise use the label from the form pages config
  const label = formPages[section]?.fields[field]?.label
  if (label) {
    return label
  }
  // Else just convert the camelCase to human
  return humanReadableLabel(field)
}

const labelForSection = (section, number) => {
  console.log(section)
  let label = labelOverrides[section]?.title ?? formPages[section]?.title
  label = `${label}${number ? ` ${number}` : ''}`
  return label
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
 * gets all sections that should be included in the cya page
 *
 * @param {array} sessionpages - keys for the pages present in the session
 * @returns {object}
 */
const getSections = () => {
  const sections = {}
  Object.entries(formPages).forEach(([section, config]) => {
    if (config.showOnCya) {
      // gather all pages
      const pages = Object.keys(currentSession).filter((key) =>
        key.startsWith(`/${section}`)
      )

      if (pages.length > 0) {
        pages
          .map((entry) => entry.slice(1)) // remove leading '/'
          .forEach((repeatSection, index) => {
            sections[repeatSection] = buildSection(
              repeatSection,
              config,
              pages.length > 1 ? index + 1 : null
            )
          })
      } else {
        sections[section] = buildSection(section, config)
      }
    }
  })
  return sections
}

/**
 * builds an object for a summary card section in the cya page
 *
 * @param {string} sectionPath - string key of the section, includes subpage
 *                               number e.g. component-code-details/1
 * @param {object} sectionConfig - config object for the section
 * @param {number} sectionNumber - subpage number for the section
 * @returns {object}
 */
const buildSection = (sectionPath, sectionConfig, sectionNumber) => {
  const sectionKey = sectionPath.split('/').at(0)
  const section = {
    title: labelForSection(sectionKey, sectionNumber),
    actions: [],
    answerRows: getAnswersForSection(
      sectionKey,
      currentSession[`/${sectionPath}`]
    )
  }

  if (sectionConfig.removable && section.answerRows.length > 0) {
    section.actions.push(link(`remove/${sectionKey}`, 'Remove', section.title))
  }

  if (section.answerRows.length === 0 && sectionConfig.conditions) {
    const href = Object.keys(sectionConfig.conditions).at(0)

    section.actions.push(link(href, 'Change', section.title))
  } else {
    const linkText = sectionKey.startsWith('component-code')
        ? 'Review & Change'
        : 'Change'

    section.actions.push(link(sectionKey, linkText, section.title))
  }

  return section
}

const link = (href, text, visuallyHiddenText) => {
  return {
    href: `${hrefRoot}${(href.startsWith('/') ? href : `/${href}`)}`,
    text,
    visuallyHiddenText
  }
}

/**
 * Gets all the answers from the session for a section
 *
 * @param {string} sectionKey - string key of the root section (no subpage)
 * @param {object} sessionData - user response data from the session
 * @returns {Array}
 */
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
 * Main function that processes the session data and returns formatted answers for govukSummaryCards.
 *
 * @param {object} session - The session data.
 * @returns {Array} - Array of objects to build summary cards.
 */
const checkYourAnswers = (session) => {
  currentSession = session
  const sections = getSections()

  return Object.values(sections)
}

module.exports = {
 checkYourAnswers,
 getAnswersForSection
}
