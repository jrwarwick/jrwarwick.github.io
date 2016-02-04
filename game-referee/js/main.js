// Copyright (c) 2015 Justin Warwick 
// Distributed under the MIT license; see LICENSE.txt 

//IE workaround
if (!window.console) {
  var noOp = function(){}; // no-op function
  console = {
    log: noOp,
    warn: noOp,
    error: noOp
  }
}


String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}



function beginCountDown (timeSeconds) {
	var aBeepMark = document.getElementById('aBeepMark');
	var aLaunch= document.getElementById('aLaunch');
	var tid;
	var secRemain;


	console.log("in " + timeSeconds + " ...");

	tid = window.setTimeout(function() {
		aLaunch.play(); 
		var bd = $('#bigdisplay');
		bd.fadeOut(); bd.html('GO! - 0'); bd.fadeIn().fadeOut().fadeIn();
		$("#missiontime").data("seconds","0");
		
		if (g_mcitid) {
			window.clearInterval(g_mcitid);
		}
		g_mcitid = window.setInterval(function() {
			var mt = $("#missiontime");
			var mtl = $("#missiontimelimit"); 
			mt.data("seconds",parseInt(mt.data("seconds"))+1);
			var chrono = new Date(null);
			var randomization = 0;
			if (! $("#missiontimelimitadj").html().match(/inactive/i)) {
				randomization = Math.random() * 120 + 120;
			}

			chrono.setSeconds(mt.data("seconds")); // specify value for SECONDS here
			mt.html( chrono.toISOString().substr(11, 8) );
			//mt.html(mt.data("seconds").toHHMMSS());
			if (mtl.data("minutes") && (mt.data("seconds") > (60 * mtl.data("minutes") + randomization))) {
				terminateMission();
			}
			console.log(mt.data("seconds"));
		}, 1000);
	}, (timeSeconds + 1) * 1000);
	for (secRemain = timeSeconds; secRemain > 0; secRemain --) {
		//if (secRemain < 10) {
			tid = window.setTimeout("aBeepMark.play(); "+'$("#bigdisplay").html('+ (timeSeconds - secRemain) +');',
				secRemain * 1000);
		console.log (tid);
		//}
		//if (secRemain < 6) {
		//	tid = window.setTimeout("aBeepMark.play();",secRemain * 1000 + 200);
		//}
	}
	
	//aBeepMark.play();
	//aLaunch.play();
}


function terminateMission() {
	//var aTerminate = document.getElementById('aTerminate');
	//aTerminate.play();

	//var msg = "MISSION TERMINATED!";
	var msg = "GAME OVER!";

	console.log(msg);
	var disp = $("#bigdisplay");
	disp.html(msg);
	disp.fadeOut().fadeIn();
	document.getElementById('aTerminate').play();
	window.clearInterval(g_mcitid);
}

