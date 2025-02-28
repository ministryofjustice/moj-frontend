const toCamelCaseWithRows = (str) => {
  return (
    `${str
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toLowerCase())  }Rows`
  )
}

// Format field names into readable labels
const formatLabel = (field) => {
  return field
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim()
}

// Replace acronyms in a string with uppercase value
const replaceAcronyms = (str, acronyms) => {
  return str.replace(new RegExp(`\\b(${acronyms.join('|')})\\b`, 'gi'), (match) => match.toUpperCase());
}

const urlToTitleCase = (str) => {
  return str
    .toLowerCase()
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

module.exports = {
  toCamelCaseWithRows,
  formatLabel,
  urlToTitleCase,
  replaceAcronyms
}
