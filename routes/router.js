var express = require('express');
var router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/play', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});



module.exports = router;
