var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/memes');
  //res.render('index', { message: '' });
});

module.exports = router;
