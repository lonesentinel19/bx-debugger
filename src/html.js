// html.js - provides basic html features for outputting
var fs = require('fs');
var path = require('path');
var config = require( path.resolve( __dirname, "./config.js" ) );

exports.header = function() {
	return "<!DOCTYPE HTML><html><head><title>bxdebugger Report</title><link rel='stylesheet' href='../includes/style.css'/></head><body>\r\n" +
	"<h2>bxdebugger " + config.version + "</h2>\r\n";
}

exports.footer = function() {
	return "</body></html>";
}

exports.format = function(error) {
	return "<div class='warning'>" + error + "</div>\r\n";
}

	try {
	} catch (e) {
		throw "An error occurred trying to generate the output file.";
	}
}
