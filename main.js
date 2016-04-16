/* bx-debugger v1.0a by lonesentinel19 
 * This program uses only synchronous functions because writing callbacks
 * can be ugly and unnecessary on such a small program like this where 
 * things operating in sync is important. 
 */

var basic = require('./src/basic.js');
var fs = require('fs');
var html = require('./src/html.js');
var config = require('./src/config.js');

var args = process.argv.slice(2);
var errors = "";

var main = function() {
	var strict;
	file   = args[0];
	// ensure that args is long enough
	// Right now any value for arg1 will result in strictmode
	if ( args.length > 0 ) {
		if ( args[1] == "strict" || args[1] == "true") {
			strict = true;
		}
	} else {
		strict = false;
	}

	if (file != null) {
		try { 
			text = fs.readFileSync(file, 'utf8');
		} catch ( e ) {
			basic.throwError("An error occurred trying to read the file.", e);
		}
	}

	if (text != null) {
		lines = text.split("\n");
		for ( i = 0; i < lines.length; i++ ) {
			// get version from batx file, then check to ensure it is inside version boundaries
			if ( i == 0 ) {
				var batchx_version = parseInt(lines[0].split("BatchX")[1], 10); // extract version and parse
				if ( batchx_version < config.batx_min_version || batchx_version > config.batx_max_version) {
					basic.throwError("BatchX is too old or too new of a version. Please update bx-debugger or batchx." +
						"\n Min BatchX Version: " + config.batx_min_version + " | Max BatchX version: " + config.batx_max_version)
				}
			}
			read(lines[i], i);
		}
	}

	finish();
} 

// push this into a string-split array
var read = function(text, num) {
	if (text.indexOf("REM Error") > -1) {
		errors = errors + "Line " + (num+1) + ": " + text + ",";
	}
}

// output 
var finish = function() {
	var formattedErrors = "";
	allErrors = errors.split(',');
	for ( i = 0; i < allErrors.length; i++ ) {
		formattedErrors = formattedErrors + html.format(allErrors[i]);
	}
	html.outputFile(formattedErrors);
	basic.njs_write("Report outputted to ./html/output.html")
}

// call main function -- somewhat C-like
if ( args.length > 0 ) {
	main();
} else {
	basic.njs_write("Not enough arguments supplied.");
}