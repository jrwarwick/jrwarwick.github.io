// TaskBurner - HTML5 jsness for a yatl 
//	justin.warwick@dominiumentis.com
//	Copyright 2015 - Justin Warwick 
//	Distributed under the MIT License; see LICENSE.txt 
//
///////////////////////////////////////////////

//==\\||//==\\

function escapeCSV (filthyData) {
	var cleanerData;
	cleanerData = filthyData;
	if (filthyData.indexOf(",") > -1 || filthyData.indexOf("\"") > -1) {
		cleanerData.replace(/"/g,"\"\"");
		cleanerData = "\"" + cleanerData + "\"";
	}
	return cleanerData.replace(/^\n+/,"").replace(/\n+$/,"");
}


function escapeJSON (filthyData) {
	//return filthyData
	return (filthyData === null) ? null : filthyData
		.replace(/[\\]/g,'\\\\')
		.replace(/[\n]/g,'\\n')
		.replace(/[\r]/g,'\\r')
		.replace(/[\"]/g,'\\"');
}


function unescapeJSON (filthyData) {
	//return filthyData
	return (filthyData === null) ? null : filthyData
		.replace(/\\n/g, '\n')
		.replace(/\\r/g, '\r')
		.replace(/\\"/g, '\"')
		.replace(/\\\\/g,'\\');
}


function listStore(listName,data) {
	var putitback = false;
	var timeaccumdisplay = $('#timeaccumdisplay-arm');
        if (timeaccumdisplay.val() == "on") {
		timeaccumdisplay.val('off').slider('refresh');
		putitback = true;
	}
	backupStore(listName);
	localStorage.setItem(listName, escapeJSON(data).replace(/\\n\\n(\\n)+/,"\\n"));
	if (putitback) {
		timeaccumdisplay.val('on').slider('refresh');
	}
}


function backupStore(listName) {
	var chronostamp = (new Date).getTime();
	//todo: proper toJSON stuff here for escaping and what not
	//TODO: retreieve the .0 then set it:
	//		localStorage.setItem(listName+'.1','{chronostamp: '+ chronostamp + ',listData: "' + data + '"}');
	localStorage.setItem(listName+'.0','{"chronostamp": '+ chronostamp + ',"listData": "' + (localStorage.getItem(listName)) + '"}');
	window.console && console.info("Backup created");
}


function restoreStore(listName,chronostamp) {
	//TODO: what was the plan for chronostamp? Let user know how old? Timeslider/parameter?
	console.log("Attempting restore of " + listName + "...");
	//vittle = JSON.parse(localStorage.getItem(listName));
	//console.log(vittle);
	//console.log(vittle.chronostamp);
	console.log(unescapeJSON(JSON.parse(localStorage.getItem(listName)).listData));
	console.log(JSON.parse(localStorage.getItem(listName)).listData);
	console.log(JSON.parse(localStorage.getItem(listName)).chronostamp);
	//TODO:front AND back burners, right? or no?
	//$("#frontBurner").html(localStorage.getItem(listName));
	$("#frontBurner").html(unescapeJSON(JSON.parse(localStorage.getItem(listName)).listData));
}


function datetimestamp(msepoch) {
//Sort of two modes: if you give an integer ms since epoch time value, return the pretty string version.
//		if you give no param, then just return pretty string version for RIGHT NOW.
	var dtst = new Date();
	if (arguments.length > 0) {
		dtst = new Date(msepoch);
	}
	return	dtst.getFullYear() +"."+ ('0'+(dtst.getMonth()+1)).slice(-2) +"."+ ('0'+dtst.getDate()).slice(-2) +"."+ 
		('0'+dtst.getHours()).slice(-2) +"."+ ('0'+dtst.getMinutes()).slice(-2) +"."+ ('0'+dtst.getSeconds()).slice(-2);
}
