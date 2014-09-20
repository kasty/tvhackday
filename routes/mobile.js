var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
	console.log( req.params.name );
	res.render('mobile', {
        name: req.params.name
    });
});

module.exports = router;