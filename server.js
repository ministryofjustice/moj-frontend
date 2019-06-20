// Core dependencies
const fs = require('fs');
const path = require('path');

// NPM dependencies
const browserSync = require('browser-sync');
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');

// Run before other code to make sure variables from .env are available
dotenv.config();

// Routing
const routes = require('./app/routes');
const autoRoutes = require('./app/routes/auto');

// Local dependencies
const utils = require('./lib/utils.js');

// Port
const port = process.env.PORT || 3000;

// Configuration
const env = process.env.NODE_ENV || 'development';
const useAuth = process.env.USE_AUTH || true;
const useHttps = process.env.USE_HTTPS || true;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const useBrowserSync = process.env.USE_BROWSER_SYNC || true;

// Set up application
const appViews = [
  path.join(__dirname, '/node_modules/govuk-frontend/components'),
  path.join(__dirname, '/app/views'),
  path.join(__dirname, '/app/views/layouts'),
  path.join(__dirname, '/app/views/partials'),
  path.join(__dirname, '/src/components')
];

// Application
const app = express();

// Find a free port and start the server
utils.findAvailablePort(app, (port) => {
  console.log('Listening on port ' + port + ' url: http://localhost:' + port);
  if ((env === 'production' || env === 'staging') || useBrowserSync === 'false') {
    app.listen(port);
  } else {
    app.listen(port - 50, () => {
      browserSync({
        proxy: 'localhost:' + (port - 50),
        port: port,
        ui: false,
        files: ['public/**/*.*', 'app/views/**/*.*'],
        ghostmode: false,
        open: false,
        notify: false,
        logLevel: 'error'
      })
    })
  }
});

// Force HTTPS on production. Do this before using basicAuth to avoid
// asking for username/password twice (for `http`, then `https`).
if ((env === 'production' || env === 'staging') && useHttps === 'true') {
  app.use(utils.forceHttps);
  app.set('trust proxy', 1); // needed for secure cookies on heroku
}

// Ask for username and password on production
if ((env === 'production' || env === 'staging') && useAuth === 'true') {
  app.use(utils.basicAuth(username, password));
}

// Search engine indexing
if ((env === 'production' || env === 'staging') && useAuth === 'false') {
  // Allow search engines to index the site
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /');
  });
} else {
  // Prevent search indexing
  app.use((req, res, next) => {
    // Setting headers stops pages being indexed even if indexed pages link to them.
    res.setHeader('X-Robots-Tag', 'noindex');
    next();
  });

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  });
}

// Nunjucks configurations
const nunjucksEnvironment = nunjucks.configure(appViews, {
  autoescape: true,
  express: app,
  noCache: true,
  watch: true
});

// Add Nunjucks filters
utils.addNunjucksFilters(nunjucksEnvironment);

// Set view engine
app.set('view engine', 'html');

// Middleware to serve static assets
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'govuk-frontend', 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'src', 'assets')));

// Use routes
app.use(routes);
app.use(autoRoutes); // must be the last one

// Start app
// app.listen(port, (err) => {

//   if (err) {
//       throw err;
//   } else {
//       console.log('Listening on port 3000 url: http://localhost:3000');
//   }

// });

const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'));
if (!nodeModulesExists) {
  console.error('ERROR: Node module folder missing. Try running `npm install`');
  process.exit(0);
}

// Create template .env file if it doesn't exist
const envExists = fs.existsSync(path.join(__dirname, '/.env'));
if (!envExists) {
  fs.createReadStream(path.join(__dirname, '/lib/template.env'))
    .pipe(fs.createWriteStream(path.join(__dirname, '/.env')));
}

module.exports = app;
