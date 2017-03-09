var express = require('express');
var app = express();
var router = express.Router();
var exec = require('child_process').exec;

router.get('/plates/:plate', function(req, res){
  var t = exec(alpr(req.params.plate),
    function(error, stdout, stderr){
      var plateOutput = JSON.parse(stdout.toString());
      res.render('index', {
        img_width: JSON.stringify(plateOutput['img_width']),
        img_height: JSON.stringify(plateOutput['img_height']),
        processing_time_ms: JSON.stringify(plateOutput['processing_time_ms']),
        results: plateOutput.results[0],
        image: '/' + req.params.plate
      });
    }
  );
});

function alpr(plate) {
  return 'alpr -c eu -j /src/app/public/images/' + plate;
}

module.exports = router;
