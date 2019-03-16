var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Join | Chat app' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat', { title: 'Chat | Chat app' });
});

module.exports = router;
