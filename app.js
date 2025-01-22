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
const nunjucks = require('nunjucks');
const session = require('express-session');
const { pushToGitHub, createPullRequest } = require('./middleware/github-api');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { ENV, APP_PORT, COMPONENT_FORM_PAGES } = require('./config');
const { generateMarkdown } = require("./middleware/generate-documentation");

const app = express();
const isDev = app.get('env') === 'development';

app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge: 60000 },
    })
);

const filters = {};

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

const isValidComponentFormPage = (req, res, next) => {
  if (!COMPONENT_FORM_PAGES.includes(req.params.page)) {
    next('Unknown page');//todo error handling
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

app.post('/get-involved/add-new-component/check-your-answers', async (req, res) => {
  const { filename: markdownFilename, content: markdownContent} = generateMarkdown(req.session)
  const markdown = {};
  markdown[markdownFilename] = markdownContent;
  const session = { ...req.session, ...markdown };
  const branchName = await pushToGitHub(session);
  const title = 'test title';
  const description = 'test description';
  await createPullRequest(branchName, title, description);
  res.redirect(req.url);
});

app.post(
    '/get-involved/add-new-component/component-image',
    validateFormData,
    upload.single('componentImage'),
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

app.post(
    '/get-involved/add-new-component/:page',
    isValidComponentFormPage,
    validateFormData,
    saveSession,
    setNextPage,
    (req, res, next) => {
      if (req.nextPage) {
        res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
      } else {
        next('unknown');
      }
    }
);

app.post('/get-involved/add-new-component/:form', validateFormData, setNextPage, (req, res) => {
  res.redirect(`/submit-community-component`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
