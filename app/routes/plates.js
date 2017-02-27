var express = require('express');
var app = express();
var router = express.Router();
var exec = require('child_process').exec;

router.get('/plates/:plate', function(req, res){
  var t = exec(alpr(req.params.plate),
    function(error, stdout, stderr){
      var plateOutput = JSON.parse(stdout.toString());
      res.render('index', {
        parsed_data: JSON.stringify(plateOutput),
        image: '/' + req.params.plate
      });
    }
  );
});

function alpr(plate) {
  return 'alpr -c eu -j /src/app/public/images/' + plate;
}

module.exports = router;
