var express = require('express');
var router = express.Router();
var app = express();

router.get('/', function(req, res) {
  res.render('plates', {
    plates: ['1.jpg','2.jpg','3.jpg', '4.jpg', '5.jpg','6.jpg','7.jpg', '8.jpg', '9.jpg']
  });
});

module.exports = router;
