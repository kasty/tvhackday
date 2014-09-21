var currentUsers = [];

var joinBand = function(userData, points, score,div) {
        var self = this;
		this.user = userData;
		this.score = score;
		this.points = points;
		this.container = div;
		var container = this.container;
		
		if(this.container.find('#joined').length == 0) this.container.append('<div id="joined"></div>');
		if(this.container.find('#points').length == 0) this.container.append('<div id="points"></div>');
		if(this.container.find('#scoring').length == 0) this.container.append('<div id="scoring"></div>');
		
		//create a new user
		this.createUser = function() {
            self.user.totalScore = 0;
            if (!currentUsers[self.user.id]) {
                currentUsers[self.user.id] = self.user;
                container.find('#joined').stop().show().html(self.user.name+' joined !').animate({fontSize : '100px'}, 500, function() {
                    container.find('#joined').fadeOut('slow', function() { container.find('#joined').empty().removeAttr('style'); ; });
                });
                this.outputScore();
            }
		}
		//update user score
		this.updateUser = function() {
			currentUsers[self.user.id].totalScore = this.score;
			this.outputScore();
			this.displayPoints();
		}
		//display score table
		this.outputScore = function() {
			container.find('#scoring').empty().html('<h3>SCORES</h3><ul id="classement"></ul>');
			var sortable = [];

            for (var s in currentUsers) {
                var user = currentUsers[s];
                sortable.push([user.name, user.totalScore]);
                sortable.sort(function(a, b) {return a[1] - b[1]});
                sortable.reverse();
            }

            $.each(sortable, function(key, value) {
                container.find('#classement').append('<li id="'+self.user.id+'"><span class="player">'+value[0]+' :</span><span class="score">'+value[1]+'</span></li>');
            });
		}
		//display the player's points
		this.displayPoints = function() {
            var userId = self.user.id;

			if(container.find('#points').find('#'+userId).length == 0)
				container.find('#points').append('<div id="'+userId+'"></div>');
			
			container.find('#'+userId).html(self.user.name+'<br />'+self.user.points).stop().animate({ opacity : 1, top : '100px'}, 200, function() {
                setTimeout(function () {
                    container.find('#' + userId).animate({opacity: 0, top: '-100px'}, 600, function () {
                        container.find('#' + userId).removeAttr('style');
                    });
                });
		    });
	    };
}
