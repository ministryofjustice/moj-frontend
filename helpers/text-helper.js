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
    .trim()
    .ucFirst()
}

const urlToTitleCase = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const ucFirst = (str) => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}

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
  truncateText,
  sanitizeText,
  ucFirst
}
