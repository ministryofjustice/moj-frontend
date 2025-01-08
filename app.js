const express = require('express');
const app = express();
const createGist = require('./middleware/github-gist');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/submit-community-component', (req, res) => {
  res.send('Submit community component');
});
app.post('/submit-community-component', createGist, (req, res) => {
  console.log('Submit community component', req.body);
  res.redirect(`/submit-community-component`);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
