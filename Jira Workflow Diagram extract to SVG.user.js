// ==UserScript==
// @name         Jira Workflow diagram extract to SVG
// @namespace    https://jrwarwick.github.io/
// @version      0.1
// @description  Jira Workflow Diagrams, in edit mode, are embedded SVG, just find and pull it out and then drop it into a download file for other usage.
// @author       justin.warwick@gmail.com
// @match        https://onprem-jira.domain.com/plugins/servlet/project-config/*/workflow/edit/*
// @match        https://onprem-jira.domain.com/plugins/servlet/project-config/*/workflow/*
// @icon         https://marketplace.atlassian.com/s/images/favicon.ico
// @grant        none
// ==/UserScript==

//Bug/TODO: it only really works if you come into the workflow editor clean, no on-going draft as this modifies button states.
//Bug/TODO: janky timer usage in injector function. Better if we have some more clean deterministic events to hook onto, or queues to jump into.

var logTag = "[UserScript:DiagramSVGExtract]: "

//The work itself is simple: the diagram in Jira is just an embedded SVG (once you have gone into Edit mode).
//So just get it and throw down as a WUA "download" file.
function saveSvg(svgEl, name) {
	svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	var svgData = svgEl.outerHTML;
	var preface = '<?xml version="1.0" standalone="no"?>\r\n';
	var svgBlob;
	try {
		svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
	} catch (e) {
		// Old browser, need to use blob builder
		window.BlobBuilder = window.BlobBuilder ||
							window.WebKitBlobBuilder ||
							window.MozBlobBuilder ||
							window.MSBlobBuilder;
		if (window.BlobBuilder) {
		   var bb = new BlobBuilder();
		   bb.append(svgData);
		   svgBlob = bb.getBlob("image/svg+xml;charset=utf-8");
		}
	}
	var svgUrl = URL.createObjectURL(svgBlob);
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = name;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

//now everything else is just inject a button to click to do this (which is harder than I expected):
//saveSvg($("#workflow-designer1 > svg")[0], $("#project-config-header-descriptor-title").html().replace(/[^0-9A-Z]/gi,"_") + ".svg");

function performSVGextraction() {
	console.info(logTag+"grasping and groping for the diagram's SVG content...");
	saveSvg($("#workflow-designer1 > svg")[0], $("#project-config-header-descriptor-title").html().replace(/[^0-9A-Z]/gi,"_") + ".svg");
}

function extractorEventInjector(evt) {
    console.info(logTag+"does edit_workflow exist yet? " + $("#edit_workflow")[0]);
    var timeoutID = setTimeout(function(){
        console.log(logTag+$("#edit_workflow")[0]);
        $("#edit_workflow").on('click',function() {
            if ($("#btnPerfSVGExt").length) {
                console.info(" already have the svg extract button...");
            } else {
                var timeoutID = setTimeout(function(){
                    $("#workflow-designer-last-saved-by").append('  <button id="btnPerfSVGExt" class="aui-button"><span class="aui-icon aui-icon-small aui-iconfont-open">Get SVG </span>Get SVG</button>');
                    $("#btnPerfSVGExt").on('click',performSVGextraction);
                },1234);
                console.log(logTag+"SVG event injection initiated... " + timeoutID);
            }
        });
    },4444);
}


(function() {
    'use strict';
    // Your code here...

    //$( window ).on( 'hashchange', function(evt) { //weered. why doesn't this work.
    //$(document).ajaxComplete(function(evt) {
    $(document).ready(extractorEventInjector);
    $( window ).on( 'hashchange',extractorEventInjector); //weered. why doesn't this work.

})();
