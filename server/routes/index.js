var express = require('express');
var router = express.Router();

const ExerciseEnum = Object.freeze({"squats":1, "jj":2, "pushups":3});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', ExerciseEnum: ExerciseEnum });
});

module.exports = router;
