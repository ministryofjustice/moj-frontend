const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get('/submit-community-component', (req, res) => {
  res.send('Submit community component');
});
app.post('/submit-community-component', (req, res) => {
  console.log('Submit community component', req.body);
  res.redirect(`/submit-community-component`);
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
