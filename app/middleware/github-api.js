const fs = require('fs')
const path = require('path')

const fetch = require('node-fetch')

const {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME,
  GITHUB_ISSUE_ASSIGNEE_USERNAMES
} = require('../config')
const {
  stripFrontmatter,
  replaceTemplateVars,
  urlize
} = require('../helpers/text-helper')

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

const pushToGitHub = async (submissionData, branchName) => {
  console.log('[GITHUB] Start pushing to Github')
  try {
    const baseSha = await getMainBranchSha()
    await createBranch(baseSha, branchName)

    for (const [filePath, content] of Object.entries(submissionData)) {
      const fileContent =
        filePath.endsWith('.md') || filePath.endsWith('11tydata.js')
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

const createReviewIssue = async (pullRequest, submissionDetails) => {
  const { url, number } = pullRequest
  const { componentName } = submissionDetails
  const componentSlug = `components/${urlize(componentName)}`
  let template

  // Load the github issue template
  try {
    template = fs.readFileSync(
      path.join(
        __dirname,
        '../../.github/ISSUE_TEMPLATE/EXPERIMENTAL_BUILDING_BLOCK.md'
      ),
      { encoding: 'utf8' }
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(
        `[GITHUB] Issue template file does not exist: ${error.message}`
      )
    } else {
      console.error(`[GITHUB] Error loading issue template: ${error.message}`)
    }
  }

  if (template) {
    const replacements = { URL: url, NUMBER: number, SLUG: componentSlug }

    // Remove the frontmatter
    template = stripFrontmatter(template)
    // Replace placeholder __VAR__ with values
    template = replaceTemplateVars(template, replacements)

    try {
      const issueEndpoint = `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/issues`
      const issueData = {
        owner: `${GITHUB_REPO_OWNER}`,
        repo: `${GITHUB_REPO_NAME}`,
        title: `Review experimental component submission: ${componentName}`,
        body: `${template}`,
        assignees: GITHUB_ISSUE_ASSIGNEE_USERNAMES,
        labels: ['EXPERIMENTAL', 'awaiting triage']
      }

      const response = await fetch(issueEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(issueData)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          `[GITHUB] Failed to create issue: ${response.status} - ${response.statusText}`
        )
        console.error(`[GITHUB] Error details: ${errorText}`)
        throw new Error('Failed to create issue.')
      }

      const issue = await response.json()
      console.log(`[GITHUB] Issue created: ${issue.html_url}`)
      return {
        url: issue.html_url,
        number: issue.number
      }
    } catch (error) {
      console.error('[GITHUB] Error creating issue:', error.message)
      throw error
    }
  }
}
module.exports = { pushToGitHub, createPullRequest, createReviewIssue }
