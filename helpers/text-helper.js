const toCamelCaseWithRows = (str) => {
  return (
    str
      .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
      .replace(/^\w/, (c) => c.toLowerCase()) + 'Rows'
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

const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

module.exports = {
  toCamelCaseWithRows,
  formatLabel,
  toTitleCase
}
