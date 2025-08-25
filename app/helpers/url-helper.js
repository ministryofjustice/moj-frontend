const crypto = require('crypto')
/**
 * Hashes the request url
 *
 * @param {string} url
 * @returns {string}
 */
const getHashedUrl = (url) => {
  return crypto.createHash('sha256').update(url).digest('hex')
}

module.exports = {
  getHashedUrl
}

