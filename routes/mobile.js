var express 	= require('express');
var router 		= express.Router();
var app 		= require('../app');
var _ 			= require('underscore');
var players 	= app.get('players');

router.get('/:name', function(req, res) {
	//
	// == Register a user
	app.get('io').on('connection', function(socket) {
        var playerName = req.params.name;

		if (false === players.exists(req.params.name)) {
			players.addPlayer(playerName);
			socket.broadcast.emit('new_challenger_event', {name: playerName});
		}

        socket.on('disconnect', function () {
            players.removePlayer(playerName);
            socket.broadcast.emit('challenger_left_event', {name: playerName});
        });
	});
	//
	// == Render the "virtual gamepad"
	res.render('mobile', {
        name: req.params.name
    });
});

module.exports = router;
