import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({"message": "Hello World"})
  
});

module.exports = router;
