const {
  IMAGE_DIRECTORY,
  IMAGE_KEYS,
  DOCUMENT_DIRECTORY,
  DOCUMENT_KEYS,
  SESSION_KEYS_TO_IGNORE
} = require('../config')
const { extractFilename, getUniqueFilename } = require('../helpers/file-helper')
const { getFileFromRedis } = require('../helpers/redis-helper')
const {
  generateMarkdown,
  generateEleventyDataFile
} = require('../middleware/generate-documentation')

const processSubmissionFiles = async (req) => {
  const fileKeys = [...DOCUMENT_KEYS, ...IMAGE_KEYS]
  const { session, submissionRef } = req
  const submissionFiles = {}
  const existingFilenames = new Set()

  for (const key of Object.keys(session)) {
    if (!SESSION_KEYS_TO_IGNORE.includes(key)) {
      const pageData = session[key]
      // Filter the page data down to just the files
      // ensure the session[key] data is an object first
      const pageFiles =
        pageData && typeof pageData === 'object' && !Array.isArray(pageData)
          ? Object.fromEntries(
              Object.entries(pageData).filter(([key, _]) =>
                fileKeys.includes(key)
              )
            )
          : {}
      for (const [field, file] of Object.entries(pageFiles)) {
        if (file?.redisKey) {
          const directory = IMAGE_KEYS.includes(field)
            ? IMAGE_DIRECTORY
            : DOCUMENT_DIRECTORY
          const { redisKey } = file // Redis key stored in session
          if (redisKey?.startsWith('file:')) {
            const { buffer, originalname } = await getFileFromRedis(redisKey) // Retrieve file from Redis
            const filename = getUniqueFilename(originalname, existingFilenames)
            existingFilenames.add(filename)
            submissionFiles[key] = {
              path: `${directory}/${submissionRef}/${filename}`,
              buffer: Buffer.from(buffer).toString('base64')
            }
          }
        }
      }
    }
  }

  return submissionFiles
}

const processSubmissionData = (req, res, next) => {
  const sessionData = { ...req.session, ...req.markdown }
  const { submissionFiles, submissionRef } = req
  const submissionData = {}

  for (const key in sessionData) {
    if (
      ![
        ...SESSION_KEYS_TO_IGNORE,
        '/componentImage' // no point saving this as text
      ].includes(key)
    ) {
      if (submissionFiles[key]) {
        const filePath = `docs/${submissionFiles[key].path}`
        submissionData[filePath] = { buffer: submissionFiles[key].buffer }
      } else {
        const filename = extractFilename(key, '/')
        if (filename.endsWith('.md') || filename.endsWith('.11tydata.js')) {
          // Documentation should be outside of the submission folder
          submissionData[`docs/components/${filename}`] = sessionData[key]
        } else {
          const filename = extractFilename(key)
          const data = Object.assign({}, sessionData[key])
          if (key.startsWith('/component-code-details')) {
            const exampleNum = key.split('/').at(2)
              ? `-${key.split('/').at(2)}`
              : ''
            const language = data.componentCodeLanguage.toLowerCase()
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

const getDetailsForPrEmail = (req, res, next) => {
  const personalData = req.session?.['/your-details']
  const componentName =
    req.session?.['/component-details']?.componentName || 'Unnamed component'

  req.detailsForPrEmail = {
    componentName,
    email: req.session?.['/email']?.emailAddress,
    figmaLink: req.session?.['/figma_link']?.figmaUrl,
    name: personalData?.fullName,
    team: personalData?.teamName
  }

  next()
}

/**
 * Store details for inclusion in PR email so team has access to them if user
 * chooses not to share publicly
 */
const processPersonalData = (req, res, next) => {
  const personalData = req.session?.['/your-details'] || {}
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
  const tabs = ['', 'overview', 'designs', 'accessibility', 'code']
  req.markdown = {}
  req.markdownContent = ''

  // generate index.md and all tab markdown
  for (const tab of tabs) {
    const { filename, content } = generateMarkdown(
      req.session,
      req.submissionFiles,
      tab
    )
    req.markdownContent += `${content}\n\n`
    req.markdown[filename] = content
  }
  // generate 11ty data file
  const { filename, content } = generateEleventyDataFile(req.session)
  req.markdown[filename] = content

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
