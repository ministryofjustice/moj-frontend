const express = require('express');
const path = require('path');
const expressNunjucks = require('express-nunjucks').default;
const { getFormData, validateFormData, setNextPage } = require('./middleware/component-session');
const fs = require('fs');
const nunjucks = require('nunjucks');  // Import Nunjucks directly to use FileSystemLoader

const PORT = 3000;//todo move to config

const app = express();
const isDev = app.get('env') === 'development';

const filters = {
  rev: function(filepath) {
    if (process.env.ENV == "production" || process.env.ENV == "staging") {
      const manifest = JSON.parse(fs.readFileSync('public/assets/rev-manifest.json', 'utf8'));
      const revision = manifest[filepath]
      return `${revision || filepath}`
    } else {
      return `${filepath}`
    }
  },
  url: function(filepath) {
    return `/${filepath}`;
  },
  eleventyNavigation: function() {
    return null //todo this needs to be handled; no navigation for now
  }
};

app.set('views', [
  path.join(__dirname, 'docs/community/pages'),
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'node_modules/govuk-frontend/dist'),
  path.join(__dirname, 'node_modules/@ministryofjustice/frontend')
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

app.get('/get-involved/add-new-component/component-details', getFormData, (req, res) => {
  res.render('component-details.njk', {
    test: 'hello test'
  });
});


// app.get('/get-involved/add-new-component/:form', getFormData, (req, res) => {
//   res.render('community/pages/form.njk', {
//     title: 'About Page',
//     content: 'Learn more about us here.',
//   });
// });

app.post('/get-involved/add-new-component/:form', validateFormData, setNextPage, (req, res) => {
  res.redirect(`/submit-community-component`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
