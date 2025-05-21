/* eslint import/order: "off" */
/* eslint n/no-unpublished-require: "off" */
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: 'https://304866cea16570b04e2090537ae9ac77@o345774.ingest.us.sentry.io/4509252675371008',
  sendDefaultPii: true
})

const path = require('path')
const redisClient = require('./helpers/redis-client')

const express = require('express')
const expressNunjucks = require('express-nunjucks').default
const rateLimit = require('express-rate-limit')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const helmet = require('helmet')
const nunjucks = require('nunjucks')

const { APP_PORT, ENV, REDIS_URL, SESSION_SECRET } = require('./config')
const addComponentRoutes = require('./routes/add-component')

const app = express()
const isDev = ENV === 'development'

if (!isDev) {
  // Only trust single proxy (Nginx)
  app.set('trust proxy', 1)

  // Add security headers
  app.use(
    helmet({
      contentSecurityPolicy: false // Disable CSP
    })
  )

  // Add rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 600, // Limit each IP to 200 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false
    })
  )
}

// Session management
const sessionOptions = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: !isDev, maxAge: 24 * 60 * 60 * 1000 }
}

if (REDIS_URL) {
  console.log('Connecting to Redis: ', REDIS_URL)
  // Set up Redis (for sessions)
  sessionOptions.store = new RedisStore({ client: redisClient })
}

app.use(session(sessionOptions))

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function (req, res, next) {
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})

// Nunjucks config
app.set('views', [
  path.join(__dirname, 'views/common'),
  path.join(__dirname, 'views/community/pages'),
  // path.join(__dirname, 'node_modules/@ministryofjustice/frontend'),
  path.join(__dirname, 'src'),
  path.join(__dirname, 'node_modules/govuk-frontend/dist')
])

app.set('view engine', 'njk')
expressNunjucks(app, {
  watch: isDev,
  noCache: false,
  loader: nunjucks.FileSystemLoader
})

// Static files and body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Routes
app.use('/contribute/add-new-component', addComponentRoutes)

// Fallback route to 404
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'))
  res.status(404).render('error', {
    message: 'Page not found.'
  })
})

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app)

// Error handling
/* eslint-disable-next-line @typescript-eslint/no-unused-vars --
 * Express must count 4 params to be error middleware
 **/
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`) // Log the error to the console
  // res.status(500).render('error', {
  //   message: 'Something went wrong. Please try again later.',
  //   errorDetails: isDev ? err.message : undefined // Only show detailed error messages in dev mode
  // })
  res.statusCode = 500
  res.end(`${res.sentry}\n`)
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`)
})
