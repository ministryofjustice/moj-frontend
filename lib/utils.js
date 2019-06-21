// Core dependencies
const fs = require('fs');
const path = require('path');

// NPM dependencies
const basicAuth = require('basic-auth');
const portScanner = require('portscanner');
const prompt = require('prompt');

// Require core and custom filters, merges to one object
// and then add the methods to Nunjucks environment
exports.addNunjucksFilters = function (env) {
  let customFilters = require('../app/filters.js')(env)
  let filters = Object.assign(customFilters)
  Object.keys(filters).forEach(function (filterName) {
    env.addFilter(filterName, filters[filterName])
  })
}

/**
 * Simple basic auth middleware for use with Express 4.x.
 *
 * Based on template found at: http://www.danielstjules.com/2014/08/03/basic-auth-with-express-4/
 *
 * @example
 * app.use('/api-requiring-auth', utils.basicAuth('username', 'password'))
 *
 * @param   {string}   username Expected username
 * @param   {string}   password Expected password
 * @returns {function} Express 4 middleware requiring the given credentials
 */

exports.basicAuth = (username, password) => {
  return (req, res, next) => {
    if (!username || !password) {
      console.log('Username or password is not set.');
      return res.send('<h1>Error:</h1><p>Username or password not set. <a href="#">See guidance for setting these</a>.</p>');
    }

    let user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    next();
  }
}

// Find an available port to run the server on
exports.findAvailablePort = (app, callback) => {
  let port = null;

  // When the server starts, we store the port in .port.tmp so it tries to restart
  // on the same port
  try {
    port = Number(fs.readFileSync(path.join(__dirname, '/../.port.tmp')))
  } catch (e) {
    port = Number(process.env.PORT || 3000)
  }

  // Check port is free, else offer to change
  portScanner.findAPortNotInUse(port, port + 50, '127.0.0.1', (error, availablePort) => {
    if (error) { throw error }
    if (port === availablePort) {
      // Port is free, return it via the callback
      callback(port);
    } else {
      // Port in use - offer to change to available port
      console.error('ERROR: Port ' + port + ' in use. You may have another application running.\n');
      // Set up prompt settings
      prompt.colors = false;
      prompt.start();
      prompt.message = '';
      prompt.delimiter = '';

      // Ask user if they want to change port
      prompt.get([{
        name: 'answer',
        description: 'Change to an available port? (y/n)',
        required: true,
        type: 'string',
        pattern: /y(es)?|no?/i,
        message: 'Please enter y or n'
      }], (err, result) => {
        if (err) { throw err }
        if (result.answer.match(/y(es)?/i)) {
          // User answers yes
          port = availablePort;
          fs.writeFileSync(path.join(__dirname, '/../.port.tmp'), port);
          console.log('Changed to port ' + port);
          callback(port);
        } else {
          // User answers no - exit
          console.log('\nYou can set a new default port in server.js, or by running the server with PORT=XXXX');
          console.log("\nExit by pressing 'ctrl + c'");
          process.exit(0);
        }
      })
    }
  })
}

// Redirect HTTP requests to HTTPS
exports.forceHttps = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    console.log('Redirecting request to https');
    // 302 temporary - this is a feature that can be disabled
    return res.redirect(302, 'https://' + req.get('Host') + req.url);
  }

  // Mark proxy as secure (allows secure cookies)
  req.connection.proxySecure = true;
  next();
}
