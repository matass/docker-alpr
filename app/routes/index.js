var express = require('express');
var router = express.Router();
var app = express();

var fs = require('fs');

function walkSync(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

router.get('/', function(req, res) {
  res.render('plates', {
    plates: walkSync('/src/app/public/images/')
  });
});

module.exports = router;
