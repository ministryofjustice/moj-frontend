/* eslint import/order: "off" */
/* eslint n/no-unpublished-require: "off" */

const path = require('path')
const redisClient = require('./helpers/redis-client')

const express = require('express')
const expressNunjucks = require('express-nunjucks').default
const rateLimit = require('express-rate-limit')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const helmet = require('helmet')
const nunjucks = require('nunjucks')

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // Limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
})

const { APP_PORT, REDIS_URL, SESSION_SECRET } = require('./config')
const addComponentRoutes = require('./routes/add-component')

const app = express()
// Only trust single proxy (Nginx)
app.set('trust proxy', 1)
const isDev = app.get('env') === 'development'

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'"],
        'connect-src': [
          "'self'",
          'https://www.googletagmanager.com', // Allow GTM
          'https://region1.google-analytics.com' // Allow Google Analytics
        ],
        'script-src': [
          "'self'",
          'https://www.googletagmanager.com', // Allow GTM
          "'sha256-GUQ5ad8JK5KmEWmROf3LZd9ge94daqNvd8xy9YS1iDw='", // Script modifying document.body.className
          "'sha256-skTG6tpg3ly5Qkn5WY5737dUMy44jsVx49TxDFudrWg='" // Google tag manager
        ],
        'frame-src': [
          "'self'",
          'http://localhost:3001',
          'https://design-patterns.service.justice.gov.uk/',
          'https://*.cloud-platform.service.justice.gov.uk'
        ] // Allow embedding
      }
    }
  })
)
app.use(limiter)

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

// Nunjucks config
app.set('views', [
  path.join(__dirname, 'views/common'),
  path.join(__dirname, 'views/community/pages'),
  path.join(__dirname, 'node_modules/govuk-frontend/dist'),
  path.join(__dirname, 'node_modules/@ministryofjustice/frontend')
])
app.set('view engine', 'njk')
expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  loader: nunjucks.FileSystemLoader
})

// Static files and body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// Routes
app.use('/contribute/add-new-component', addComponentRoutes)

// Fallback route to homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Error handling
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`) // Log the error to the console
  res.status(500).render('error', {
    message: 'Something went wrong. Please try again later.',
    errorDetails: isDev ? err.message : undefined // Only show detailed error messages in dev mode
  })
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`)
})
