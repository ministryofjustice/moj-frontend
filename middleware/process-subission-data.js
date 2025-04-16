const redis = require('../helpers/redis-client')

const imageDirectory = 'docs/assets/images'
const fileDirectory = 'docs/assets/files'
// Retrieve File from Redis
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

const extractFilename = (key, includeDirectories = true) => {
  const segments = key.split('/')
  const lastSegment = segments[segments.length - 1]
  segments[segments.length - 1] = lastSegment.includes('.')
    ? lastSegment
    : `${lastSegment}.txt`
  const result = includeDirectories
    ? segments.join('/')
    : segments[segments.length - 1]
  return result.startsWith('/') ? result.slice(1) : result
}

const getUniqueFilename = (originalName, existingFilenames) => {
  let counter = 0
  let uniqueName = originalName

  // Check and resolve conflicts
  while (existingFilenames.has(uniqueName)) {
    counter += 1
    const nameWithoutExtension = originalName.replace(/(\.[\w\d]+)$/, '') // Remove extension
    const extension = originalName.match(/(\.[\w\d]+)$/)?.[0] || '' // Extract the extension
    uniqueName = `${nameWithoutExtension}-${counter}${extension}`
  }

  existingFilenames.add(uniqueName) // Track used filename
  return uniqueName
}

const processSubmissionFiles = async (sessionData, submissionRef) => {
  const submissionFiles = {}
  const existingFilenames = new Set()

  for (const key in sessionData) {
    if (!['cookie', 'csrfToken'].includes(key)) {
      const fileData = sessionData[key]
      if (
        fileData?.componentImage?.redisKey ||
        fileData?.accessibilityReport?.redisKey
      ) {
        const directory = fileData.componentImage
          ? imageDirectory
          : fileDirectory

        const file = fileData.componentImage || fileData.accessibilityReport
        const { redisKey } = file // Redis key stored in session
        if (redisKey?.startsWith('file:')) {
          const { buffer, originalname } = await getFileFromRedis(redisKey) // Retrieve file from Redis
          const filename = getUniqueFilename(originalname, existingFilenames)
          const fileContent = Buffer.from(buffer).toString('base64')
          const filePath = `${directory}/${submissionRef}/${filename}`
          submissionFiles[key] = {
            path: filePath,
            buffer: fileContent
          }
        }
      }
    }
  }
  return submissionFiles
}

const processSubmissionData = (sessionData, submissionFiles, submissionRef) => {
  const submissionData = {}

  for (const key in sessionData) {
    if (!['cookie', 'csrfToken'].includes(key)) {
      if (submissionFiles[key]) {
        const filePath = submissionFiles[key].path
        submissionData[filePath] = { buffer: submissionFiles[key].buffer }
      } else {
        const filename = extractFilename(key)
        if (filename.endsWith('.md')) {
          // Documentation should be outside of the submission folder
          submissionData[filename] = sessionData[key]
        } else {
          submissionData[`${submissionRef}/${filename}`] = sessionData[key]
        }
      }
    }
  }

  return submissionData
}

module.exports = { processSubmissionData, processSubmissionFiles }
