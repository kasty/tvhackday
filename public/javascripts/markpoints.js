$(document).on('ready', function() {

var currentUsers = {};
var joinBand = function(userID, points, score) {
		this.user = userID;
		this.score = score;
		this.points = points;
		this.container = $('.video-container').find('iframe')[0].contentWindow.$(".infoOverlay");
		if(this.container.find('#joined').length == 0) this.container.append('<div id="joined"></div>');
		if(this.container.find('#points').length == 0) this.container.append('<div id="points"></div>');
		if(this.container.find('#scoring').length == 0) this.container.append('<div id="scoring"></div>');
		//create a new user
		this.createUser = function() {
			currentUsers[this.user] = {};
			currentUsers[this.user].totalScore = 0;
			$('#joined').stop().show().html(this.user+' joined !').animate({fontSize : '100px'}, 500, function() {
				$('#joined').fadeOut('slow', function() { $('#joined').empty().removeAttr('style'); ; });
			});
			this.outputScore();
		}
		//update user score
		this.updateUser = function() {
			currentUsers[this.user].totalScore = score;
			this.outputScore();
			this.displayPoints();
		}
		//display score table
		this.outputScore = function() {
			$('#scoring').empty().html('<h3>SCORES</h3><ul id="classement"></ul>');
			var sortable = [];
			$.each(currentUsers, function(key, value) {
				sortable.push([key, value.totalScore]);
				sortable.sort(function(a, b) {return a[1] - b[1]});
				sortable.reverse();
			});	
			$.each(sortable, function(key, value) {
				$('#classement').append('<li><span class="player">'+value[0]+' :</span><span class="score">'+value[1]+'</span></li>');
			});
		}
		//display the player's points
		this.displayPoints = function() {
			var that = this;
			if($('#points').find('#'+that.user).length == 0)
				$('#points').append('<div id="'+that.user+'"></div>');
			
			$('#'+that.user).html(that.user+'<br />'+that.points).stop().animate({ opacity : 1, top : '100px'}, 200, function() {
				setTimeout(function() {
					console.log(that.user);
					$('#'+that.user).animate({ opacity : 0, top : '-100px' }, 600, function() {
						$('#'+that.user).removeAttr('style');
					});
				} //setTimeout
			
			);
	
			
		});
	};
}
function markPoint(user, points, score) {
	if(typeof currentUsers[user] !== "undefined") {
		var join = new joinBand(user, points, score);
		join.updateUser();
	}
	else {
		var join = new joinBand(user, points, score);
		join.createUser();
	}
}

});