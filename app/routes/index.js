const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/components', function(req, res) {
  res.redirect('/');
});

module.exports = router;