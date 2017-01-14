/* bx-debugger v1.0a by lonesentinel19
 * This program uses only synchronous functions because writing callbacks
 * can be ugly and unnecessary on such a small program like this where
 * things operating in sync is important.
 */

var basic = require('./src/basic.js');
var fs = require('fs');
var html = require('./src/html.js');
var config = require('./src/config.js');
var patchr = require('./src/patchr.js');
var open = require('opener');

var args = process.argv.slice(2);
var errors = "", brackets, bracketLine;

var main = function() {
	var strict = false, patchr_enabled = false;
	file   = args[0];
	// ensure that args is long enough
	// Right now any value for arg1 will result in strictmode
	if ( args.length > 0 ) {
		if ( args[1] == "strict" || args[1] == "true") {
			strict = true;
		}
		if ( args[1] == "patchr" || args[2] == "patchr" ) {
			patchr_enabled = true;
		}
	}
	// To clear the html folder we just delete and recreate
	if ( args[0] == "clear" ) {
		try {
			basic.deleteFolderRecursive('html');
			fs.mkdirSync('html');
			throw "./html folder cleaned."; // use throw to kill the program.
		} catch (e) {
			throw "Error attempting to clean ./html folder."
		}
	}

  // Otherwise, once condiitons have been set forth, continue
	if (file != null && args[0] !== "clear" ) {
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
	var errorMsg;
	if (text.indexOf("REM Error") > -1) {
		if ( patchr_enabled = true ) {
			errorMsg = text.split('REM Error ')[1];
			out = patchr.fix(errorMsg.trim());
		}
		errors = errors + "Line " + (num+1) + ": " + text + out + "$$,$$"; // use unique split delimeters
	}
	/* Check for open brackets */
	if ( text.indexOf("{") > 2 ) { // 5
		brackets = true;
		bracketLine = num;
	}

	if ( text.indexOf("}") > -1 ) {
		brackets = false;
		bracketLine = 0;
	}

}

// output
var finish = function() {
	var now = Date.now(); // There needs to be one unified timestamp to use
	var formattedErrors = "";
	allErrors = errors.split('$$,$$');
	for ( i = 0; i < allErrors.length; i++ ) {
		formattedErrors = formattedErrors + html.format(allErrors[i]);
	}
	if ( brackets == true ) {
		formattedErrors = formattedErrors + html.format('Line ' + bracketLine + ': Unclosed brackets were detected.');
	}
	html.outputFile(formattedErrors, file, now);
	basic.njs_write("Report outputted to ./html/output-" + file + "-" + now + ".html")
	open('./html/output-' + file + "-" + now + ".html");
}

// call main function -- somewhat C-like
if ( args.length > 0 ) {
	main();
} else {
	basic.njs_write("Not enough arguments supplied.");
}
