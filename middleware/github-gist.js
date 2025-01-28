const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

async function createGist(req, res, next) {
  const { componentName, codeExample } = req.body
  const uniqueFileName = `${uuidv4()}.txt`

  const gistData = {
    description: componentName,
    public: true,
    files: {
      [uniqueFileName]: {
        content: codeExample
      }
    }
  }

  try {
    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${GITHUB_TOKEN}`
      },
      body: JSON.stringify(gistData)
    })

    const data = await response.json()

    if (response.ok) {
      res.locals.gistUrl = data.html_url
      next()
    } else {
      res.status(500).send(`Error creating Gist: ${data.message}`)
    }
  } catch (error) {
    console.error('Error creating Gist:', error)
    res.status(500).send('Something went wrong while creating the Gist.')
  }
}

module.exports = createGist
