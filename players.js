var _ 			= require('underscore');

module.exports = {
	players: [],

	exists: function(player) {
		return _.contains(this.players, player);
	},

	addPlayer: function(player) {
		/*!this.exists(player) && */this.players.push(player);
	}
}