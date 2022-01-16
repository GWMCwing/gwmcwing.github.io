var express = require('express');
var path = require('path');
var router = express.Router();
var rootPath = path.normalize(__dirname + '/../');

// direct request like on github pages

/* GET home page. */
router.get('/', function (req, res, next) {
	res.sendFile(path.join(rootPath, '/index.html'));
});

// view page
router.get('/views/:pathToTarget', function (req, res, next) {
	res.sendFile(path.join(rootPath, '/views/' + req.params.pathToTarget));
});

// resources
router.get('/res/:pathToTarget', function (req, res, next) {
	res.sendFile(path.join(rootPath, '/res/' + req.params.pathToTarget));
});

module.exports = router;
