const redis = require('../redis-client')

/**
 * Retrieves a file from redis store
 *
 * @param {string} redisKey - the key to retrieve from redis
 * @returns {RedisFile}
 */
const getFileFromRedis = async (redisKey) => {
  try {
    const fileData = await redis.get(redisKey)
    if (!fileData) throw new Error(`File not found for Redis key: ${redisKey}`)

    const { buffer, originalname, mimetype } = JSON.parse(fileData)
    return { buffer: Buffer.from(buffer, 'base64'), originalname, mimetype }
  } catch (err) {
    console.error(`[Redis] Error retrieving file: ${err}`)
    throw err
  }
}

module.exports = {
  getFileFromRedis
}

/**
 * A file returned from redis.
 *
 * @typedef {object} RedisFile
 * @property {Buffer} buffer - The buffer for the file contents in base64 format
 * @property {string} originalname - The orginal filename
 * @property {string} mimetype - The mime type of the file
 */
