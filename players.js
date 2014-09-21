var _ = require('underscore');

module.exports = {
	players: [],

	exists: function(player) {
		return _.contains(this.players, player);
	},

	addPlayer: function(player) {
		this.players.push(player);
	},

    removePlayer: function(player) {
        this.players.splice(_.indexOf(this.players, player), 1);
    }
}
