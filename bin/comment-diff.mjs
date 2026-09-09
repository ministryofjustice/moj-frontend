import { readFile } from 'node:fs/promises'

const {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  PR_NUMBER,
  GITHUB_WORKSPACE,
  DIFF_TYPE,
  GITHUB_SHA,
  GITHUB_RUN_ID
} = process.env

const requiredEnvironment = {
  GITHUB_TOKEN,
  GITHUB_REPOSITORY,
  PR_NUMBER,
  GITHUB_WORKSPACE,
  DIFF_TYPE,
  GITHUB_SHA,
  GITHUB_RUN_ID
}

for (const [name, value] of Object.entries(requiredEnvironment)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
}

const [owner, repo] = GITHUB_REPOSITORY.split('/')
if (!owner || !repo) {
  throw new Error(`Invalid GITHUB_REPOSITORY: ${GITHUB_REPOSITORY}`)
}

const diffDefinitions = {
  dist: {
    directory: 'dist',
    files: [
      [
        'js.diff',
        'JavaScript changes to dist',
        'moj-frontend/dist/js.diff',
        false
      ],
      [
        'css.diff',
        'Stylesheets changes to dist',
        'moj-frontend/dist/css.diff',
        false
      ],
      [
        'other.diff',
        'Other changes to dist',
        'moj-frontend/dist/other.diff',
        true
      ]
    ]
  },
  package: {
    directory: 'package',
    files: [
      [
        'js.diff',
        'JavaScript changes to npm package',
        'moj-frontend/package/js.diff',
        true
      ],
      [
        'css.diff',
        'Stylesheets changes to npm package',
        'moj-frontend/package/css.diff',
        true
      ],
      [
        'other.diff',
        'Other changes to npm package',
        'moj-frontend/package/other.diff',
        true
      ]
    ]
  }
}

const definition = diffDefinitions[DIFF_TYPE]
if (!definition) {
  throw new Error(`Unsupported DIFF_TYPE: ${DIFF_TYPE}`)
}

const apiBaseUrl = `https://api.github.com/repos/${owner}/${repo}`
const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28'
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {})
    }
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`GitHub API request failed (${response.status}): ${body}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

async function getExistingComment(marker) {
  for (let page = 1; ; page += 1) {
    const comments = await githubRequest(
      `/issues/${PR_NUMBER}/comments?per_page=100&page=${page}`
    )
    const existing = comments.find(({ body }) => body?.includes(marker))
    if (existing) {
      return existing
    }
    if (comments.length < 100) {
      return undefined
    }
  }
}

async function deleteComment(marker) {
  const existing = await getExistingComment(marker)
  if (existing) {
    await githubRequest(`/issues/comments/${existing.id}`, { method: 'DELETE' })
  }
}

async function upsertComment(marker, title, body) {
  const fullBody = `<!-- ${marker} -->\n## ${title}\n\n${body}\n\n---\n[Action run](https://github.com/${owner}/${repo}/actions/runs/${GITHUB_RUN_ID}) for ${GITHUB_SHA}`
  const existing = await getExistingComment(marker)
  const options = {
    method: existing ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: fullBody })
  }
  const path = existing
    ? `/issues/comments/${existing.id}`
    : `/issues/${PR_NUMBER}/comments`
  await githubRequest(path, options)
}

async function readDiff(filename) {
  try {
    return await readFile(
      `${GITHUB_WORKSPACE}/.cache/diff/${definition.directory}/${filename}`,
      'utf8'
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      return ''
    }
    throw error
  }
}

for (const [filename, title, marker, skipEmpty] of definition.files) {
  const diffText = await readDiff(filename)
  if (!diffText && skipEmpty) {
    await deleteComment(marker)
  } else {
    const body = diffText
      ? `\`\`\`diff\n${diffText}\n\`\`\``
      : 'No diff changes found.'
    try {
      await upsertComment(marker, title, body)
    } catch (error) {
      console.error(`Unable to post ${filename} diff comment: ${error.message}`)
      await upsertComment(
        marker,
        title,
        `The diff could not be posted as a comment. You can download it from the [workflow artifacts](https://github.com/${owner}/${repo}/actions/runs/${GITHUB_RUN_ID}#artifacts).`
      )
    }
  }
}
