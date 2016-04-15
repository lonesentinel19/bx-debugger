/* bx-debugger v0.1 by lonesentinel19 
 * This program uses only synchronous functions because writing callbacks
 * can be ugly and unnecessary on such a small program like this where 
 * things operating in sync is important. 
 */

var basic = require('./src/basic.js');
var fs = require('fs');
var html = require('./src/html.js');

var args = process.argv.slice(2);
var errors = "";

var main = function() {
	file   = args[0];
	// ensure that args is long enough
	if ( args.length > 0 && args[1] == "strict") {
		strict = true;
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
			read(lines[i], i);
				//finish();
		}
	}
		finish();
} 

// push this into a string-split array
var read = function(text, num) {
	if (text.indexOf("REM Error") > -1) {
		errors = errors + num + ": " + text + ",";
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
main();