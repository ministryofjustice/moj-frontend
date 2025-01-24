const express = require('express');
const multer = require('multer');
const {
  validateFormData,
  setNextPage,
  saveSession
} = require('../middleware/component-session');
const {
  pushToGitHub,
  createPullRequest
} = require('../middleware/github-api');
const sendEmail = require('../middleware/notify-email');
const { generateMarkdown } = require('../middleware/generate-documentation');
const { COMPONENT_FORM_PAGES } = require('../config');
const ApplicationError = require('../helpers/application-error');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const isValidComponentFormPage = (req, res, next) => {
  if (!COMPONENT_FORM_PAGES.includes(req.params.page)) {
    const error = new ApplicationError('Unknown page', 404);
    console.log(error.toErrorObject());
    next(error);
  } else {
    next();
  }
};

// Component form page
router.get('/:page', isValidComponentFormPage, (req, res) => {
  res.render(`${req.params.page}`, {
    submitUrl: req.originalUrl
  });
});

// "Check Your Answers" form submission
router.post('/check-your-answers', async (req, res) => {
  const { filename: markdownFilename, content: markdownContent } = generateMarkdown(req.session);
  const markdown = {};
  markdown[markdownFilename] = markdownContent;
  const session = { ...req.session, ...markdown };
  const branchName = await pushToGitHub(session);
  const title = 'test title';
  const description = 'test description';
  const pr = await createPullRequest(branchName, title, description);
  await sendEmail(pr);
  res.redirect(req.url);
});

// Component image upload
router.post(
  '/component-image',
  upload.single('componentImage'),
  validateFormData,
  saveSession,
  setNextPage,
  (req, res, next) => {
    if (req.nextPage) {
      res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
    } else {
      const error = new ApplicationError('Unknown page', 404);
      console.log(error.toErrorObject());
      next(error);
    }
  }
);

// Form submissions for pages
router.post('/:page', isValidComponentFormPage, validateFormData, saveSession, setNextPage, (req, res, next) => {
  if (req.nextPage) {
    res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
  } else {
    const error = new ApplicationError('Unknown page', 404);
    console.log(error.toErrorObject());
    next(error);
  }
});

module.exports = router;
