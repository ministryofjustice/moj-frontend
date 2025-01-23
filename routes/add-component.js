const express = require('express');
const multer = require('multer');
const {
  getFormData,
  validateFormData,
  setNextPage,
  saveSession
} = require('../middleware/component-session');
const {
  pushToGitHub,
  createPullRequest
} = require('../middleware/github-api');
const { generateMarkdown } = require('../middleware/generate-documentation');
const { COMPONENT_FORM_PAGES } = require('../config');

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

const isValidComponentFormPage = (req, res, next) => {
  if (!COMPONENT_FORM_PAGES.includes(req.params.page)) {
    next('Unknown page'); // TODO: handle error properly
  } else {
    next();
  }
};

// Component form page
router.get('/:page', isValidComponentFormPage, getFormData, (req, res) => {
  res.render(`${req.params.page}`, {
    submitUrl: req.originalUrl,
    formData: req.formData,
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
  await createPullRequest(branchName, title, description);
  res.redirect(req.url);
});

// Component image upload
router.post(
  '/component-image',
  validateFormData,
  upload.single('componentImage'),
  saveSession,
  setNextPage,
  (req, res, next) => {
    if (req.nextPage) {
      res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
    } else {
      next('unknown'); // TODO: error middleware needed
    }
  }
);

// Form submissions for pages
router.post('/:page', isValidComponentFormPage, validateFormData, saveSession, setNextPage, (req, res, next) => {
  if (req.nextPage) {
    res.redirect(`/get-involved/add-new-component/${req.nextPage}`);
  } else {
    next('unknown'); // TODO: handle error
  }
});

module.exports = router;
