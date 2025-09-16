/* eslint import/order: "off" */
/* eslint n/no-unpublished-require: "off" */
const path = require('path')
const envPath = path.join(__dirname, `.env.${process.env.ENV || 'development'}`)
require('dotenv').config({ path: envPath })

const Sentry = require('@sentry/node')
const {
  APP_PORT,
  ENV,
  REDIS_URL,
  SESSION_SECRET,
  SENTRY_DSN,
  SENTRY_CSP_REPORT_URI
} = require('./config')

const isDev = ENV === 'development'
const isTest = ENV === 'test'

if (!(isDev || isTest)) {
  Sentry.init({
    dsn: SENTRY_DSN,
    sendDefaultPii: false,
    environment: ENV
  })
}
const redisClient = require('./redis-client')
const crypto = require('crypto')

const express = require('express')
const expressNunjucks = require('express-nunjucks').default
const rateLimit = require('express-rate-limit')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const helmet = require('helmet')
const nunjucks = require('nunjucks')
const { xss } = require('express-xss-sanitizer')

const rev = require('../filters/rev')

const addComponentRoutes = require('./routes/add-component')

const app = express()

if (!(isDev || isTest)) {
  // Only trust single proxy (Nginx)
  app.set('trust proxy', 1)

  app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(32).toString('hex')
    next()
  })

  // Add security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        reportOnly: false,
        directives: {
          reportUri: SENTRY_CSP_REPORT_URI,
          scriptSrc: [
            "'self'",
            'https://www.googletagmanager.com',
            (req, res) => `'nonce-${res.locals.cspNonce}'`
          ],
          connectSrc: [
            "'self'",
            '*.googletagmanager.com',
            '*.google.com',
            '*.google-analytics.com'
          ],
          frameSrc: ['*.googletagmanager.com'],
          imgSrc: ["'self'", '*.googletagmanager.com']
        }
      },
      referrerPolicy: {
        policy: 'no-referrer-when-downgrade'
      }
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
  cookie: { secure: !(isDev || isTest), maxAge: 24 * 60 * 60 * 1000 }
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
  path.join(__dirname, '../src'),
  path.join(__dirname, '../node_modules/govuk-frontend/dist')
])

app.set('view engine', 'njk')
const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: false,
  loader: nunjucks.FileSystemLoader
})

njk.env.addFilter('rev', rev)

app.locals.env = {
  isDev: ENV === 'development',
  isStaging: ENV === 'staging'
}

// Static files and body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())
// Component Code needs to be handled separately as it cannot sanitize js
app.use(
  xss({
    allowedKeys: ['componentCode']
  })
)

// Routes
app.use('/contribute/add-new-component', addComponentRoutes)

// Fallback route to 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page not found'
  })
})

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app)

// Error handling
/* eslint-disable-next-line @typescript-eslint/no-unused-vars --
 * Express must count 4 params to be error middleware
 **/
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(`Error: ${err.message}`)
  if (err.status && err.status === 404) {
    res.status(404).render('404', {
      title: 'Page not found'
    })
  } else {
    res.status(500).render('500', {
      title: 'Sorry, there is a problem with the service',
      errorDetails: isDev ? err.message : undefined // Only show detailed error messages in dev mode
    })
  }
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`)
})
