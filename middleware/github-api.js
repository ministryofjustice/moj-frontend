const fetch = require('node-fetch')

const {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME
} = require('../config')
const imageDirectory = 'images'
const fileDirectory = 'files'

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

const handleFile = (fileData) => {
  return fileData && fileData.buffer
    ? Buffer.from(fileData.buffer).toString('base64')
    : null
}

const getMainBranchSha = async () => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`,
    {
      headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` }
    }
  )
  if (!response.ok) {
    const errorText = await response.text()
    console.error(
      `[GITHUB] Failed to fetch main branch: ${response.status} - ${response.statusText}`
    )
    console.error(`[GITHUB] Error details: ${errorText}`)
    throw new Error(`Failed to fetch main branch: ${response.statusText}`)
  }
  const mainBranch = await response.json()
  return mainBranch.object.sha
}

const createBranch = async (baseSha, branchName) => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/refs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha })
    }
  )
  if (!response.ok) {
    throw new Error(`Failed to create branch: ${response.statusText}`)
  }
}

const addFileToBranch = async (filePath, fileContent, branchName) => {
  const response = await fetch(
    `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add ${filePath} in submission folder`,
        content: fileContent,
        branch: branchName
      })
    }
  )
  if (!response.ok) {
    console.error(
      `[GITHUB] Failed to add file ${filePath}: ${response.statusText}`
    )
    throw new Error(`Failed to add file ${filePath}: ${response.statusText}`)
  }
}

const pushToGitHub = async (sessionData) => {
  console.log('[GITHUB] Start pushing to Github')

  const existingFilenames = new Set() // To store unique filenames across files

  const getUniqueFilename = (originalName) => {
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

  try {
    const submissionData = {}
    Object.keys(sessionData).forEach((key) => {
      if (key !== 'cookie') {
        const fileData = sessionData[key]
        if (
          fileData?.componentImage?.buffer ||
          fileData?.accessibilityReport?.buffer
        ) {
          const directory = fileData.componentImage
            ? imageDirectory
            : fileDirectory
          const file = fileData.componentImage || fileData.accessibilityReport
          const filename = getUniqueFilename(file.originalname)
          const fileContent = handleFile(file)
          const filePath = `submission/${directory}/${filename}`
          submissionData[filePath] = { buffer: fileContent }
        } else {
          const filename = extractFilename(key)
          submissionData[`submission/${filename}`] = sessionData[key]
        }
      }
    })

    const baseSha = await getMainBranchSha()
    const branchName = `submission-${Date.now()}`
    await createBranch(baseSha, branchName)

    for (const [filePath, content] of Object.entries(submissionData)) {
      const fileContent = filePath.endsWith('.md')
        ? Buffer.from(content).toString('base64')
        : content?.buffer ||
          Buffer.from(JSON.stringify(content, null, 2)).toString('base64')
      await addFileToBranch(filePath, fileContent, branchName)
    }

    console.log(
      `[GITHUB] Branch ${branchName} created and files added successfully.`
    )
    return branchName
  } catch (error) {
    console.error('[GITHUB] Error interacting with GitHub API:', error?.message)
    throw error
  }
}

const createPullRequest = async (branchName, title, description = '') => {
  try {
    const prEndpoint = `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`
    const prData = {
      title,
      head: branchName,
      base: 'main',
      body: description
    }

    const response = await fetch(prEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prData)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(
        `[GITHUB] Failed to create pull request: ${response.status} - ${response.statusText}`
      )
      console.error(`[GITHUB] Error details: ${errorText}`)
      throw new Error('Failed to create pull request.')
    }

    const pr = await response.json()
    console.log(`[GITHUB] Pull request created: ${pr.html_url}`)
    return pr.html_url
  } catch (error) {
    console.error('[GITHUB] Error creating pull request:', error.message)
    throw error
  }
}

module.exports = { pushToGitHub, createPullRequest }
