const maxWords = (value, helpers, max) => {
  const wordCount = value.split(/\s+/).length
  if (wordCount > max) {
    return helpers.error('custom.max.words')
  }
  return value
}

module.exports = maxWords
