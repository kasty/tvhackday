var express 	= require('express');
var router 		= express.Router();
var app 		= require('../app');
var _ 			= require('underscore');
var players 	= app.get('players');

router.get('/:name', function(req, res) {
	//
	// == Register a user
	app.get('io').on('connection', function(socket) {
		if (false === players.exists(req.params.name)) {
			players.addPlayer(req.params.name);
			socket.broadcast.emit('new_challenger_event', req.params.name);
		}
	});
	//
	// == Render the "virtual gamepad"
	res.render('mobile', {
        name: req.params.name
    });
});

module.exports = router;