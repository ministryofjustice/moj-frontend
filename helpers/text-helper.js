const sanitizeHtml = require('sanitize-html')
const toCamelCaseWithRows = (str) => {
  return `${str
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    .replace(/^\w/, (c) => c.toLowerCase())}Rows`
}

// Format field names into readable labels
const humanReadableLabel = (field) => {
  return field
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

// Replace acronyms in a string with uppercase value
const replaceAcronyms = (str, acronyms) => {
  return str.replace(
    new RegExp(`\\b(${acronyms.join('|')})\\b`, 'gi'),
    (match) => match.toUpperCase()
  )
}

const urlToTitleCase = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const truncateText = (text, maxWords) => {
  try {
    const words = String(text).split(' ')
    if (words.length > maxWords) {
      return `${words.slice(0, maxWords).join(' ')}...`
    }
    return text
  } catch (e) {
    console.error('Truncate text: ', e)
  }
}

const sanitizeText = (text) => {
  return sanitizeHtml(String(text), {
    allowedTags: [],
    allowedAttributes: {}
  })
}

module.exports = {
  toCamelCaseWithRows,
  humanReadableLabel,
  urlToTitleCase,
  replaceAcronyms,
  truncateText,
  sanitizeText
}
