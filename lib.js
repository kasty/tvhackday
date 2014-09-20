// Params
var canvas;
var Ease = createjs.Ease;
var Tween = createjs.Tween;
var circleRadius = 40;
var trackWidth = window.innerWidth/3;
	
function zobInit()
{
	// Canvas & stage
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	stage = new createjs.Stage(canvas);

	// Lines
	createLine(1);
	createLine(2);
	
	// Events
	window.addEventListener('resize', resize, false);

	// FPS & render loop
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener('tick', function() {
		//console.log(createjs.Ticker.getMeasuredFPS());
		stage.update();
	});
}

// Functions
function createCircle(trackNumber, color) {
	var circle = new createjs.Shape();
	circle.graphics.beginFill(color).drawCircle(0, 0, circleRadius);
	circle.x = trackWidth*trackNumber;
	circle.y = 0-circleRadius;
	Tween.get(circle).to({y:canvas.height+circleRadius}, 1000, Ease.linear, function() {
		stage.removeChild(circle);
	});
	stage.addChild(circle);
}

function createLine(trackNumber) {
	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(10);
	line.graphics.beginStroke("#EEE");
	line.graphics.moveTo(trackWidth*trackNumber, 0);
	line.graphics.lineTo(trackWidth*trackNumber, window.innerHeight+200); // What the...
	line.graphics.endStroke();
	stage.addChild(line);
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	stage.update();
}

document.domain = "arte.tv";
var player;
var hasAlreadyPaused = false;
var dancer = new Dancer();
var previousKickTimeStamp,previousClacTimeStamp,inactivityKickTime,inactivityClacTime,inactivityTime = 0;
					
$(window).load(function() {

	//listen to the arte_vp_player_config_ready event
	$('.video-container').on('arte_vp_player_ready',function() {
		
		$(this).find('iframe').contents().find('body').find('.jwcontrols').css('z-index', 50);
		
		arte_vp = $(this).find('iframe')[0].contentWindow.arte_vp;
		var self = this;

		$(this).find('iframe')[0].contentWindow.arte_vp.jwplayer.onPlay(function(event){
			
			if(hasAlreadyPaused == false)
			{
				hasAlreadyPaused = true;

				$(self).find('iframe')[0].contentWindow.$("#player_container").append("<canvas style='width:100%;height:100%;position: relative;'></canvas>");
				canvas = $(self).find('iframe')[0].contentWindow.$("#player_container canvas")[0];
		
				zobInit();
					
				arte_vp.jwplayer.pause();
				arte_vp.jwplayer.setVolume(0);
				
				//console.log(arte_vp.arte_vp_sources[2].file);
				dancer.load({src:arte_vp.arte_vp_sources[2].file});
				dancer.play();
				arte_vp.jwplayer.play(true);
				//dancer.audio.volume = 0;
				
				setInterval(function(){
					
					inactivityClacTime = Date.now()-previousClacTimeStamp;
					inactivityKickTime = Date.now()-previousKickTimeStamp;
					inactivityTime = Math.min(inactivityKickTime,inactivityClacTime);
					
					if(inactivityTime>800)
					console.log("shake");
								
				}, 20);


		
				var kick = dancer.createKick({
					frequency:[ 0, 4 ],
					threshold:0.04,
					decay:0.005,
					onKick: function ( mag ) {
						if(inactivityKickTime>100)
						{
							var color = randomColor();
                			createCircle(1, color);
                		}
                		previousKickTimeStamp = Date.now();
					},
					offKick: function ( mag ) {
					}
				});

				// Let's turn this kick on right away
				kick.on();
				
				var clac = dancer.createKick({
					frequency:[ 4, 10 ],
					threshold:0.04,
					decay:0.005,
					onKick: function ( mag ) {
						if(inactivityClacTime>100)
						{
							var color = randomColor();
                			createCircle(2, color);
                		}
                		previousClacTimeStamp = Date.now();
					},
					offKick: function ( mag ) {
					}
				});

				// Let's turn this kick on right away
				clac.on();
			}
		});
	
	});
});