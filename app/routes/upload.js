var express = require('express');
var app = express();
var router = express.Router();
var exec = require('child_process').exec;

var multer = require('multer');
var filename = '';
var storage = multer.diskStorage({
  destination: function (req, file, callback){
    callback(null, '/src/app/public/images/');
  },
  filename: function (req, file, callback) {
    console.log(file.originalname.replace(/\s/g));
    callback(null, file.originalname.replace(/\s/g, ''));
  }
});

var upload = multer({storage : storage}).single('plate');

router.get('/upload', function(req, res) {
  res.render('upload');
});

router.post('/api/upload', function(req, res, next) {
  upload(req,res,function(err) {
    var filename = req.file.originalname;
    if(err) {
      return res.end("error");
    }
    else {
      res.redirect('/plates/' + filename);
    }
  });
});

module.exports = router;
