var express = require('express');
var router = express.Router();
const {isRealString} = require('./../bin/utils/validation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Join | Chat app', bodyClass: 'class="centered-form"' });
});

router.get('/chat', function(req, res, next) {
  if (!isRealString(req.query.name) || !isRealString(req.query.room)) {
    res.render('error', {message: 'Пашол ты !!!!!'});
  } else {
    res.render('chat', { title: 'Chat | Chat app', bodyClass: 'class="chat"' });
  }
});

module.exports = router;