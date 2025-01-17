const express = require('express');
const path = require('path');
const expressNunjucks = require('express-nunjucks').default;
const {
  getFormData,
  validateFormData,
  setNextPage,
  saveSession,
} = require('./middleware/component-session');
const fs = require('fs');
const nunjucks = require('nunjucks'); // Import Nunjucks directly to use FileSystemLoader
const session = require('express-session'); // Import express-session
const { pushToGitHub } = require('./middleware/github-api');
const PORT = 3000; // todo move to config

const app = express();
const isDev = app.get('env') === 'development';

// Set up session middleware
app.use(
    session({
      secret: 'your-secret-key', // Replace with a secure, random key
      resave: false, // Don't save the session if it wasn't modified
      saveUninitialized: true, // Save uninitialized sessions
      cookie: { secure: false, maxAge: 60000 }, // Adjust secure for production, maxAge sets cookie expiration
    })
);

const filters = {
  rev: function (filepath) {
    if (process.env.ENV == 'production' || process.env.ENV == 'staging') {
      const manifest = JSON.parse(
          fs.readFileSync('public/assets/rev-manifest.json', 'utf8')
      );
      const revision = manifest[filepath];
      return `${revision || filepath}`;
    } else {
      return `${filepath}`;
    }
  },
  url: function (filepath) {
    return `/${filepath}`;
  },
  eleventyNavigation: function () {
    return null; // todo this needs to be handled; no navigation for now
  },
};

app.set('views', [
  path.join(__dirname, 'docs/community/pages'),
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'node_modules/govuk-frontend/dist'),
  path.join(__dirname, 'node_modules/@ministryofjustice/frontend'),
]);

app.set('view engine', 'njk');

expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  filters: filters,
  loader: nunjucks.FileSystemLoader,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'public')));

const componentFormPages = [
  'component-details',
  'component-image',
  'your-details',
  'check-your-answers',
]; // todo move to config

const isValidComponentFormPage = (req, res, next) => {
  if (!componentFormPages.includes(req.params.page)) {
    next('Unknown'); // todo handle 404
  } else {
    next();
  }
};

app.get('/get-involved/add-new-component/:page', isValidComponentFormPage, getFormData, (req, res) => {
  res.render(`${req.params.page}`, {
    submitUrl: req.url,
    formData: req.formData,
  });
});

app.post('/get-involved/add-new-component/check-your-answers', async (req, res, next) => {
  console.log(req.session); // Session data can be accessed here
  // todo git hub
  await pushToGitHub(req.session);


  res.redirect(req.url);
});

app.post(
    '/get-involved/add-new-component/:page',
    isValidComponentFormPage,
    validateFormData,
    saveSession,
    setNextPage,
    (req, res, next) => {
      // todo handle errors...
      if (req.nextPage) {
        res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
      } else {
        next('unknown'); // todo error middleware needed
      }
    }
);

app.post('/get-involved/add-new-component/:form', validateFormData, setNextPage, (req, res) => {
  res.redirect(`/submit-community-component`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
