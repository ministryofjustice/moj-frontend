/**
 * Creates a filename from a sesssion key
 * given keys of '/your-details' or '/component-code/1'
 * returns filenames of your-details.txt or component-code-1.txt
 *
 * @param {string} key - the session key to generate a filename for
 */
const extractFilename = (key) => {
  key = key.startsWith('/') ? key.slice(1) : key

  const segments = key.split('/')
  const lastSegment = segments.at(-1)

  segments[segments.length - 1] = lastSegment.includes('.')
    ? lastSegment
    : `${lastSegment}.txt`

  return segments.join('-')
}

/**
 * Generates a unique filename against a set of existing filenames
 * if there is a collision, add an incrementing number to the filename
 *
 * @param {string} originalName - the filename to generate check for uniqueness
 * @param {Set} existingFilenames
 */
const getUniqueFilename = (originalName, existingFilenames) => {
  let counter = 0
  const sanitizedName = originalName.replace(/\s+/g, '-')
  let uniqueName = sanitizedName

  // Check and resolve conflicts
  while (existingFilenames.has(uniqueName)) {
    counter += 1
    const nameWithoutExtension = sanitizedName.replace(/(\.[\w\d]+)$/, '') // Remove extension
    const extension = sanitizedName.match(/(\.[\w\d]+)$/)?.[0] || '' // Extract the extension
    uniqueName = `${nameWithoutExtension}-${counter}${extension}`
  }

  return uniqueName
}

module.exports = {
  extractFilename,
  getUniqueFilename
}
