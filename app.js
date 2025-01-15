const express = require('express');
const path = require('path');
const app = express();
const createGist = require('./middleware/github-gist');
const sendEmail = require('./middleware/notify-email');
const expressNunjucks = require('express-nunjucks').default;
const {createSession, getFormData, validateFormData, setNextPage} = require('./middleware/component-session');
const PORT = 3000;

const isDev = app.get('env') === 'development';

// app.set('views', __dirname + '/templates');
// app.set('views', __dirname + '/views');
app.set('views', __dirname + '/docs');
app.set('view engine', 'njk');

expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/get-involved/component-details', createSession, (req, res) => {
  res.redirect(`/submit-community-component`);
})

app.get('/get-involved/add-new-component/:form', getFormData, (req, res) => {
  //todo serve up next page
  // res.render('form', { form: req.form });
  res.render('community/pages/form.njk', {
    title: 'About Page',
    content: 'Learn more about us here.',
  });
})

app.post('/get-involved/add-new-component/:form', validateFormData, setNextPage, (req, res) => {
  //todo handle errors...
  //handle redirection
})

// app.get('/submit-community-component', (req, res) => {
//   res.send('Submit community component');
// });
// app.post('/submit-community-component', createGist, (req, res) => {
//   console.log('Submit community component', req.body);
//   sendEmail()
//   res.redirect(`/submit-community-component`);
// })

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
