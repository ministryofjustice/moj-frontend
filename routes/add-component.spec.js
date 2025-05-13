jest.mock('../middleware/verify-csrf', () => (req, res, next) => {
  next()
})

const path = require('path')

const express = require('express')
const expressNunjucks = require('express-nunjucks').default
const session = require('express-session')
const nunjucks = require('nunjucks')
const request = require('supertest')

const router = require('./add-component')

const currentDirectory = __dirname
const parentDirectory = path.resolve(currentDirectory, '..')

const app = express()

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
  })
)

app.use((req, res, next) => {
  if (req.session) {
    req.session.started = true
  }
  next()
})

app.set('views', [
  path.join(parentDirectory, 'views/common'),
  path.join(parentDirectory, 'views/community/pages'),
  path.join(parentDirectory, 'node_modules/govuk-frontend/dist'),
  path.join(parentDirectory, 'node_modules/@ministryofjustice/frontend')
])
app.set('view engine', 'njk')
expressNunjucks(app, {
  loader: nunjucks.FileSystemLoader
})

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(parentDirectory, 'public')))
app.use(express.json())
app.use('/assets', express.static(path.join(parentDirectory, 'public')))

app.use('/contribute/add-new-component', router)

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

describe('Component Details Form Tests', () => {
  describe('GET /contribute/add-new-component/component-details', () => {
    it('should render the form page successfully', async () => {
      const response = await request(app).get(
        '/contribute/add-new-component/component-details'
      )

      expect(response.status).toBe(200)
      expect(response.text).toContain(
        '<form method="post" action="/contribute/add-new-component/component-details">'
      )
      expect(response.text).toContain('What’s the name of the component?')
      expect(response.text).toContain(
        'Describe the component'
      )
      expect(response.text).toContain(
        'How is the component being used?'
      )
    })

    it('should include add another button in the response', async () => {
      const response = await request(app).get(
        '/contribute/add-new-component/component-code-details'
      )

      expect(response.status).toBe(200)
      expect(response.text).toContain('Add another code example')
    })
  })

  describe('POST /contribute/add-new-component/component-details', () => {
    let csrfToken

    beforeEach(async () => {
      const response = await request(app).get(
        '/contribute/add-new-component/component-details'
      )
      const matches = response.text.match(/name="_csrf" value="([^"]+)"/)
      csrfToken = matches ? matches[1] : null
    })

    it('should return errors if required fields are missing', async () => {
      const response = await request(app)
        .post('/contribute/add-new-component/component-details')
        .send({ _csrf: csrfToken })

      expect(response.status).toBe(400)
      expect(response.text).toContain('govuk-error-summary')
      expect(response.text).toContain('There is a problem')
      expect(response.text).toContain(
        'Enter the name of the component'
      )
      expect(response.text).toContain(
        'Enter a description of the component'
      )
      expect(response.text).toContain(
        'Enter an answer for how the component is being used'
      )
    })

    it('should redirect to the next page if all fields are valid', async () => {
      const response = await request(app)
        .post('/contribute/add-new-component/component-details')
        .send({
          _csrf: csrfToken,
          componentName: 'Test Component',
          componentOverview: 'A brief description',
          howIsTheComponentUsed: 'It is needed for testing'
        })

      expect(response.status).toBe(302)
      expect(response.header.location).toBe(
        '/contribute/add-new-component/component-image'
      )
    })
  })
})
