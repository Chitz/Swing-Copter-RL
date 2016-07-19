agent.init();
stateActionDict = {};
distanceFromLeftHammerDict = {};
distanceFromRightHammerDict = {};
heightDict = {};
bestScoreSoFar = 0;
stepCount = 0;
totalScore = 0;
episodeStepCountLimit = 500;
totalRewardPerEpisode = 0;
mergeDistanceFactor = 2;
game = {
	init : function(){
		gapSize = 160;
		handDistance = 200;
		handWidth = 323;
		minHandWidth = 50;
		container = $('#container');
		player = $('#player');
		cWidth = container.width();
		cHeight = container.height();
		speed = 300;
		posMark = 0;
		direction = 0;
		topHandL = topHandR = null;
		timmer = null;
		e1W = 20;
		e1H = 20;
		e2W = 20;
		e2H = 30;
		e1R = Math.sqrt(e1W*e1W + e1H*e1H),
		e2R = Math.sqrt(e2W*e2W + e2H*e2H);
		score = 0;
		stepInEpisode = 0;
		totalRewardPerEpisode = 0;
		scroeC = $('#score');
	},
	isMobile : function(){
		var sUserAgent= navigator.userAgent.toLowerCase(),
		bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
		bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
		bIsMidp= sUserAgent.match(/midp/i) == "midp",
		bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
		bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
		bIsAndroid= sUserAgent.match(/android/i) == "android",
		bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
		bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
		bIsWebview = sUserAgent.match(/webview/i) == "webview";
		return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
	},
	start : function(){
		player.addClass('flyl');
		//console.log("new step");

		// reset score

		// call environmentStart

		var state = game.getState();
		//console.log(state);

		// call agentStart
		var action = agent.agent_start(state);

		game.performAction(action);
		// call environment_step with current state and action

		$('#trees').addClass('treedown');
		game.bgMove();
		scroeC.show();

		var eventType = this.isMobile() ? 'touchstart' : 'click';
		$(document).on(eventType, function(){
			if(++direction%2==0){
				player[0].className = 'flyl';
			}
			else{
				player[0].className = 'flyr';
			}
		});
	},

	// returns the state in form of
	// { "distanceFromLeft": _ , "distanceFromRight": _}
	getState: function () {
		var distanceFromLeftWall = Math.floor(player.position().left);
		var distanceFromRightWall = Math.floor(cWidth - player.position().left);
		var playerHeightFromTop = Math.floor(player.offset().top);
		var hands = $('.hand_l, .hand_r');
		var results = [];
		hands.each(function(index, element) {
			results.push(game.getDistanceFromHammer(player, $(this).find('.t')));
		});

		var height = null;
		var distanceFromLeftHammer = null;
		var distanceFromRightHammer = null;

		if(results.length > 2) {
			if(results.length == 6){
				if(results[1][1] > 0 && results[2][1] > 0 && results[4][1] > 0){
					if(results[1][1] < results[2][1] && results[1][1] < results[4][1]){
						height = results[1][1];
						distanceFromLeftHammer = results[0][0];
						distanceFromRightHammer = results[1][0];
					}else if(results[2][1] < results[1][1] && results[2][1] < results[4][1]){
						height = results[2][1];
						distanceFromLeftHammer = results[2][0];
						distanceFromRightHammer = results[3][0];
					}else if(results[4][1] < results[1][1] && results[4][1] < results[2][1]){
						height = results[4][1];
						distanceFromLeftHammer = results[4][0];
						distanceFromRightHammer = results[5][0];
					}
				} else if(results[1][1] > 0 && results[2][1] > 0){
					if (results[1][1] > results[2][1]) {
						height = results[2][1];
						distanceFromLeftHammer = results[2][0];
						distanceFromRightHammer = results[3][0];
					} else {
						height = results[1][1];
						distanceFromLeftHammer = results[0][0];
						distanceFromRightHammer = results[1][0];
					}
				} else if(results[2][1] > 0 && results[4][1] > 0){
					if (results[4][1] > results[2][1]) {
						height = results[2][1];
						distanceFromLeftHammer = results[2][0];
						distanceFromRightHammer = results[3][0];
					} else {
						height = results[4][1];
						distanceFromLeftHammer = results[4][0];
						distanceFromRightHammer = results[5][0];
					}
				} else if(results[4][1] > 0 && results[1][1] > 0){
					if (results[4][1] > results[2][1]) {
						height = results[1][1];
						distanceFromLeftHammer = results[0][0];
						distanceFromRightHammer = results[1][0];
					} else {
						height = results[4][1];
						distanceFromLeftHammer = results[4][0];
						distanceFromRightHammer = results[5][0];
					}
				}else if(results[4][1] > 0){
					height = results[4][1];
					distanceFromLeftHammer = results[4][0];
					distanceFromRightHammer = results[5][0];
				}else if(results[2][1] > 0){
					height = results[2][1];
					distanceFromLeftHammer = results[2][0];
					distanceFromRightHammer = results[3][0];
				}else if(results[1][1] > 0){
					height = results[1][1];
					distanceFromLeftHammer = results[0][0];
					distanceFromRightHammer = results[1][0];
				}


			}else if (results.length == 4) {
				if (results[1][1] > 0 && results[2][1] > 0) {
					if (results[1][1] > results[2][1]) {
						height = results[2][1];
						distanceFromLeftHammer = results[2][0];
						distanceFromRightHammer = results[3][0];
					} else {
						height = results[1][1];
						distanceFromLeftHammer = results[0][0];
						distanceFromRightHammer = results[1][0];
					}
				} else if (results[1][1] > 0) {
					height = results[1][1];
					distanceFromLeftHammer = results[0][0];
					distanceFromRightHammer = results[1][0];
				} else {
					height = results[2][1];
					distanceFromLeftHammer = results[2][0];
					distanceFromRightHammer = results[3][0];
				}
		}
		}else if(results.length > 0){

			height = results[1][1];
			distanceFromLeftHammer = results[0][0];
			distanceFromRightHammer = results[1][0];
		}

		// if(stepInEpisode != 0 && stepInEpisode%150 == 0){
		// 	console.log(JSON.stringify(results));
		// 		console.log("results " + results.length + "height " + height + " distanceFromLeftHammer " + distanceFromLeftHammer +
		// 		" distanceFromRightHammer " + distanceFromRightHammer);
		// 		//game.stop();
		// }

		distanceFromLeftHammerDict[distanceFromLeftHammer] = 1;
		distanceFromRightHammerDict[distanceFromRightHammer] = 1;
		heightDict[height] = 1;


		//console.log("height " + height + " distanceFromLeftHammer " + distanceFromLeftHammer
		//+ " distanceFromRightHammer " +  distanceFromRightHammer);


		// applying horizontal and vertical transformation

		distanceFromLeftHammer = distanceFromLeftHammer - (distanceFromLeftHammer % mergeDistanceFactor)
		distanceFromRightHammer = distanceFromRightHammer - (distanceFromRightHammer % mergeDistanceFactor)
		height = height - (height % mergeDistanceFactor)


		//var distanceFromLeftHammer =
		var movement = (direction%2 == 0)?"Left":"right";

		var state  = { //"distanceFromLeftWall" : distanceFromLeftWall,
						//"distanceFromRightWall" : distanceFromRightWall,
						"distanceFromLeftHammer" : distanceFromLeftHammer,
						"distanceFromRightHammer" : distanceFromRightHammer,
						"height" : height,
						"movement" : movement
					};
		return state;
	},

	// take an action

	performAction: function(action){

		// perform action on game, to get next state and corresponding reward
		if(action) {
			if (++direction % 2 == 0)
				player[0].className = 'flyl';
			else
				player[0].className = 'flyr';
		}

	},

	getDistanceFromHammer : function(e1, e2){
		var e1Offset = e1.offset(),

		e2Offset = e2.offset();

		l1 = Math.round((e1Offset.left+e1W/2)- (e2Offset.left+e2W/2));
		l2 = Math.round((e1Offset.top+e1H/2) - (e2Offset.top+e2H/2));

 		return [l1, l2];

	},
	impactCheck : function(e1, e2){
		//console.log("Imct new step")

		// e1.offset -> gives
		var e1Offset = e1.offset(),
		e2Offset = e2.offset(),
		e1PositionL = e1.position().left,
		l1 = (e1Offset.left+e1W/2) - (e2Offset.left+e2W/2),
		l2 = (e1Offset.top+e1H/2) - (e2Offset.top+e2H/2),
		l3 = Math.sqrt(l1*l1 + l2*l2);
		// console.log("e1PositionL " + e1PositionL + " e1W " + e1W + " cWidth " + cWidth)
		// to check left and right crash
		if(e1PositionL<=1 || e1PositionL+e1W>=cWidth){
			console.log("Left crash" + e1PositionL)
			return true;
		}

		//return false;
		return l3<(e1R+e2R-10);
	},
	generateHand : function(){
		if(topHandL && parseInt(topHandL.css('top'))<handDistance)return;
		var handL = $('<div class="hand_l"><div class="t trot"></div></div>'),
			handR = $('<div class="hand_r"><div class="t trot"></div></div>'),
			handLminL = handWidth-minHandWidth,
			handLmaxL = handWidth+minHandWidth+gapSize-cWidth,
			handLLeft = Math.random()*(handLmaxL-handLminL) + handLminL;
		handL.css({top:-50, left:-handLLeft});
		handR.css({top:-50, left:handWidth-handLLeft+gapSize});
		container.append(handL, handR);
		topHandL = handL;
		topHandR = handR;
	},
	bgMove : function(){
		//console.log("CAME BACK");
		game.generateHand();//Produce beams
		stepInEpisode++;
		// set reward for staying alive
		var reward = 1;
		var isTerminalState = false;
		posMark += 2;
		container.css('background-position', '0 '+posMark+'px');
		//var count = 0
		var hands = $('.hand_l, .hand_r');
		hands.each(function(index, element){
			//console.log(player.offset().left)
			//count += 1
			var _this = $(this),
				thisTop = parseInt(_this.css('top'));
			if(thisTop>cHeight){
				_this.remove();
			}
			else{
				thisTop += 2;
				_this.css('top', thisTop+'px');
			}
			if(thisTop>player.offset().top+e1H){
				// It has been located below
				if(!_this.data('pass') && index%2==0){
					scroeC.text(++score);
					_this.data('pass', 1);
				}
			}
			else{
				// Impact checking
				if(game.impactCheck(player, _this.find('.t'))){
					// console.log("ENDDDDDD HERE#####################");
					reward = -1000;
					isTerminalState = true;
					game.stop();
					// call agent_step with next state and reward
					//agent.agent_step(game.getState(), reward)
					return false;
				}
			}
		});

		//console.log("CAME HERE");
		// call agent_step with next state and reward
		action = agent.agent_step(game.getState(), reward, isTerminalState);
		totalRewardPerEpisode += reward;
		//game.stop();
		game.performAction(action);
		//console.log("count " + count)
		timmer = requestAnimationFrame(game.bgMove);
	},
	stop : function(){
		if(bestScoreSoFar < score)
			bestScoreSoFar = score;

		totalScore += score;
		stepCount++;

		stateActionValueKeysLength = Object.keys(stateActionValue).length;

		if(stepCount <= episodeStepCountLimit) {
			messageToWrite = (totalRewardPerEpisode + 1000) + " " + score + " " + bestScoreSoFar + " " + stepCount +
				" " + totalScore + " " + (totalScore / stepCount).toFixed(2) + " " + stateActionValueKeysLength;

			console.log(messageToWrite);
			// console.log("GAME STOPPED Return " + totalRewardPerEpisode + " CURRENT SCORE " + score + " BEST SCORE SO FAR " + bestScoreSoFar + " StepCount " +
			// stepCount + " totalScore " + totalScore + " Average " + stepCount/totalScore);

			// call AJAX
		}else{
			// kill and start a new run
			game.endGame();
			return
		}

		// console.log("distanceFromLeftHammerDict " + Object.keys(distanceFromLeftHammerDict).length
		//  + " distanceFromRightHammerDict " + Object.keys(distanceFromRightHammerDict).length +
		//  		" heightDict " + Object.keys(heightDict).length);

		//player[0].className = 'dropdown';
		cancelAnimationFrame(timmer);
		game.restart();

	},
	restart : function(){
		game.init();
		$('.hand_l, .hand_r').remove();
		scroeC.text(score);
		player[0].className = '';
		game.start();
	},

	endGame : function(){
		player[0].className = 'dropdown';
		$(document).off('click');
		setTimeout(function(){
			cancelAnimationFrame(timmer);
		},0);
		setTimeout(function(){
			$('#scorefinal').text("GAME END!");
			$('#scorepan').show();
		}, 250);
	}
};

(function(){
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    }
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    }
}());

game.init();
$('.start').on('click', function(){
	game.start();
	$(this).hide();
});
$('#again').on('click', function(){
	game.restart();
	$('#scorepan').hide();
});
