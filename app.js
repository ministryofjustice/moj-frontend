const express = require('express');
const path = require('path');
const expressNunjucks = require('express-nunjucks').default;
const { createSession, getFormData, validateFormData, setNextPage } = require('./middleware/component-session');
const PORT = 3000;

const app = express();
const isDev = app.get('env') === 'development';

// Define your custom filters here
const filters = {
  rev: function(filepath) {
    // Example: Add '.rev' before the file extension
    return filepath.replace(/(\.\w+)$/, ".rev$1");
  },
  url: function(filepath) {
    // Example: Prepend '/static' to the file path
    return `/static${filepath}`;
  }
};

// Set up view engine
app.set('views', path.join(__dirname, 'docs'));  // Point to your templates folder
app.set('view engine', 'njk');

// Initialize express-nunjucks with custom filters
expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
  templates: [
    path.join(__dirname, 'docs/_includes'),
    path.join(__dirname, 'docs/community/pages'),
    path.join(__dirname, 'node_modules/govuk-frontend/dist'),
    path.join(__dirname, 'node_modules/@ministryofjustice/frontend')
  ],
  filters: filters // Pass the custom filters here
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Example route to render a page
app.get('/get-involved/add-new-component/:form', getFormData, (req, res) => {
  res.render('community/pages/form.njk', {
    title: 'About Page',
    content: 'Learn more about us here.',
  });
});

app.post('/get-involved/add-new-component/:form', validateFormData, setNextPage, (req, res) => {
  // Handle form submission, redirection, or error handling
  res.redirect(`/submit-community-component`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
