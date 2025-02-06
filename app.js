const express = require('express')
const path = require('path')
const expressNunjucks = require('express-nunjucks').default
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const nunjucks = require('nunjucks')
const { createClient } = require('redis')
const { APP_PORT, REDIS_URL, REDIS_AUTH_TOKEN } = require('./config')

const addComponentRoutes = require('./routes/add-component')

const app = express()
const isDev = app.get('env') === 'development'

// Session management
const sessionOptions = {
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 360000 }
}

console.log('ENV:', app.get('env'))
console.log('REDIS:', REDIS_URL)

if (!!isDev) {
  console.log('Connecting to Redis: ', 'master.cp-35a69c78e47785b1.iwfvzo.euw2.cache.amazonaws.com')

  // Set up Redis (for sessions)
  const redisClient = createClient({
    url: `${REDIS_AUTH_TOKEN}@${REDIS_URL}`,
    legacyMode: true
  })

  redisClient.connect().catch(console.error)

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
app.use('/assets', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/get-involved/add-new-component', addComponentRoutes)

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
