const redis = require('../helpers/redis-client')
const { generateMarkdown } = require('../middleware/generate-documentation')

const imageDirectory = 'assets/images'
const fileDirectory = 'assets/files'

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

// given keys of '/your-details' or '/component-code/1'
// returns filenames of your-details.txt or component-code-1.txt
const extractFilename = (key) => {
  key = key.startsWith('/') ? key.slice(1) : key

  const segments = key.split('/')
  const lastSegment = segments.at(-1)

  segments[segments.length - 1] = lastSegment.includes('.')
    ? lastSegment
    : `${lastSegment}.txt`

  return segments.join('-')
}

const getUniqueFilename = (originalName, existingFilenames) => {
  let counter = 0
  let uniqueName = originalName.replace(/\s+/g, '-')

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

const processSubmissionFiles = async (req) => {
  console.log('processing files')
  console.log(req)
  const { session, submissionRef } = req
  const submissionFiles = {}
  const existingFilenames = new Set()

  for (const key of Object.keys(session)) {
    if (!['cookie', 'csrfToken'].includes(key)) {
      const fileData = session[key]
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

const processSubmissionData = (req, res, next) => {
  console.log('processing submission data')
  const sessionData = { ...req.session, ...req.markdown }
  console.log(sessionData)
  const { submissionFiles, submissionRef } = req
  const submissionData = {}

  for (const key in sessionData) {
    if (!['cookie', 'csrfToken'].includes(key)) {
      if (submissionFiles[key]) {
        const filePath = `docs/${submissionFiles[key].path}`
        submissionData[filePath] = { buffer: submissionFiles[key].buffer }
      } else {
        const filename = extractFilename(key)
        if (filename.endsWith('.md')) {
          // Documentation should be outside of the submission folder
          submissionData[`docs/components/${filename}`] = sessionData[key]
        } else {
          const data = Object.assign({}, sessionData[key])
          if (key.startsWith('/component-code-details')) {
            const exampleNum = key.split('/').at(2)
              ? `-${key.split('/').at(2)}`
              : ''
            const language = data.componentCodeLanguage
            let extension = `.${language}`
            switch (language) {
              case 'nunjucks':
                extension = '.njk'
                break
              case 'javascript': {
                extension = '.js'
                break
              }
            }
            const code = data.componentCode
            if (language.toLowerCase() !== 'other') {
              const filePath = `submissions/${submissionRef}/code/example${exampleNum}${extension}`
              submissionData[filePath] = {
                buffer: Buffer.from(code).toString('base64')
              }
            }
          }
          submissionData[`submissions/${submissionRef}/${filename}`] = data
        }
      }
    }
  }

  req.submissionData = submissionData
  next()
}

const getDetailsForPrEmail = (req, res, next ) => {
  const personalData = req.session['/your-details']
  const componentName =
    req.session?.['/component-details']?.componentName || 'Unnamed component'

  req.detailsForPrEmail = {
    componentName,
    email: req.session?.['/email']?.emailAddress,
    name: personalData.fullName,
    team: personalData.teamName
  }

  next()
}

/**
 * Store details for inclusion in PR email so team has access to them if user
 * chooses not to share publicly
 */
const processPersonalData = (req, res, next) => {
  console.log('excluding personal data')
  const personalData = req.session['/your-details']
  const data = Object.assign({}, personalData)
  // Remove personal data
  data.fullName = 'Not shared'
  data.teamName = 'Not shared'

  // Add back in personal details if permission is given
  if (personalData?.shareYourDetails?.includes('addNameToComponentPage')) {
    data.fullName = personalData.fullName
  }
  if (personalData?.shareYourDetails?.includes('addTeamNameToComponentPage')) {
    data.teamName = personalData.teamName
  }

  // Overwrite your details info for github submission and component page
  req.session['/your-details'] = data

  next()
}

const buildComponentPage = (req, res, next) => {
  console.log('building component page')
  const { filename: markdownFilename, content: markdownContent } =
    generateMarkdown(req.session, req.submissionFiles)
  req.markdown = {}
  req.markdownFilename = markdownFilename
  req.markdownContent = markdownContent
  req.markdown[markdownFilename] = markdownContent
  next()
}

const generateSubmissionRef = (req, res, next) => {
  req.submissionRef = `submission-${Date.now()}`
  next()
}

module.exports = {
  processSubmissionData,
  processSubmissionFiles,
  processPersonalData,
  buildComponentPage,
  generateSubmissionRef,
  getDetailsForPrEmail
}
