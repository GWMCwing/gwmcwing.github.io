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
router.get(
	[
		'/views/:path1',
		'/views/:path1/:path2',
		'/views/:path1/:path2/:path3',
		'/views/:path1/:path2/:path3/:path4',
		'/views/:path1/:path2/:path3/:path4/:path5',
		'/views/:path1/:path2/:path3/:path4/:path5/:path6',
	],
	function (req, res, next) {
		const path1 = req.params.path1 || '';
		const path2 = req.params.path2 || '';
		const path3 = req.params.path3 || '';
		const path4 = req.params.path4 || '';
		const path5 = req.params.path5 || '';
		const path6 = req.params.path6 || '';
		res.sendFile(path.join(rootPath, 'views', path1, path2, path3, path4, path5, path6));
	}
);

// resources
router.get(
	[
		'/res/:path1',
		'/res/:path1/:path2',
		'/res/:path1/:path2/:path3',
		'/res/:path1/:path2/:path3/:path4',
		'/res/:path1/:path2/:path3/:path4/:path5',
		'/res/:path1/:path2/:path3/:path4/:path5/:path6',
	],
	function (req, res, next) {
		const path1 = req.params.path1 || '';
		const path2 = req.params.path2 || '';
		const path3 = req.params.path3 || '';
		const path4 = req.params.path4 || '';
		const path5 = req.params.path5 || '';
		const path6 = req.params.path6 || '';
		res.sendFile(path.join(rootPath, 'res', path1, path2, path3, path4, path5, path6));
	}
);

module.exports = router;
