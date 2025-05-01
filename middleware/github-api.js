const fetch = require('node-fetch')

const {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME
} = require('../config')

const getMainBranchSha = async () => {
  console.log(GITHUB_API_TOKEN)
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
  console.log(filePath)
  console.log(fileContent)
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

const pushToGitHub = async (submissionData, branchName) => {
  console.log('[GITHUB] Start pushing to Github')
  console.log(submissionData)
  try {
    const baseSha = await getMainBranchSha()
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

    // Add label to the pull request
    const labelEndpoint = `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues/${pr.number}/labels`
    const labelResponse = await fetch(labelEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ labels: ['contribution', 'preview:request'] })
    })

    if (!labelResponse.ok) {
      const errorText = await labelResponse.text()
      console.error(
        `[GITHUB] Failed to add label: ${labelResponse.status} - ${labelResponse.statusText}`
      )
      console.error(`[GITHUB] Error details: ${errorText}`)
      throw new Error('Failed to add label.')
    }

    console.log(`[GITHUB] Label added to pull request: ${pr.html_url}`)
    return {
      url: pr.html_url,
      number: pr.number
    }
  } catch (error) {
    console.error('[GITHUB] Error creating pull request:', error.message)
    throw error
  }
}

module.exports = { pushToGitHub, createPullRequest }
