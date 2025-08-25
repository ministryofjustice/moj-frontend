const sanitizeHtml = require('sanitize-html')

/**
 * Format field names into readable labels
 *
 * @param {string} str - the string to convert
 */
const humanReadableLabel = (str) => {
  return ucFirst(
    str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/-/g, ' ')
      .toLowerCase()
      .trim()
  )
}

/**
 * Converts a hyphenated url string to title case
 *
 * @param {string} str - the url string to convert
 */
const urlToTitleCase = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Uppercases the first letter of a string
 *
 * @param {string} str - the string to process
 */
const ucFirst = (str) => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}
/**
 * Truncates a string to a maximum number of words
 *
 * @param {string} text - the text string to process
 * @param {number} maxWords - the maximum number of words
 */
const truncateText = (text, maxWords) => {
  try {
    const words = String(text).split(' ')
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`
    }
    return text
  } catch (error) {
    console.error('Truncate text: ', error)
  }
}

/**
 * Sanitizes and strips all html from a string
 *
 * @param {string} text - the text to sanitize
 */
const sanitizeText = (text) => {
  return sanitizeHtml(String(text), {
    allowedTags: [],
    allowedAttributes: {}
  })
}

/**
 * Converts a camelCase string to kebab-case
 *
 * @param {string} str - the string to convert
 */
const camelToKebab = (str) => {
  return str?.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

module.exports = {
  humanReadableLabel,
  urlToTitleCase,
  truncateText,
  sanitizeText,
  ucFirst,
  camelToKebab
}
