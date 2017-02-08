// PATCHR
var patch = {};
var fs = require('fs');

patch.identifyAndSolve = function(msg){
	switch (msg)
	{
		case "File size exceeds 2048 lines, please split into many files.":
			err = 0;
			break;
		case "Not enough arguments provided.":
			err = 1;
			break;
		case "-END- tag missing.":
			err = 2;
			break;
		case "Classes have duplicate names.":
			err = 3;
			break;
		case "Use of protected class variable: Line": // fix
			err = 4
			break;
		case 5:
			err = "Not enough arguments supplied for function at line " + line; // fix
			break;
		case "Arrays: Ensure that array and values exist.":
			err = 6;
			break;
		case "Transpiler variable might not exist.":
			err = 7;
			break;
		case "tar: ensure that you have two arguments and no spaces between arguments.":
			err = 8;
			break;
		case "free: ensure that there is one argument and that the variable exists.":
			err = 9;
			break;
	}
	return err;
}
exports.fix = function(msg) {
	var errCode = patch.identifyAndSolve(msg)
	return 'PATCHR:' + patch['case'+errCode]();
}
patch.case0 = function(msg) {
	return "BatchX has an arbitrary limit on file sizes which is currently 2048 lines. This limit may be removed but is there to prevent performance issues and crashing of the transpiler." +
	"To remedy this issue just slice the file into parts, and then transpile, or try and remove excess code (or even optimize!).";
}

/* This error should never be called since it is only displayed in the cmd window and never outputted to a file. */
patch.case1 = function(msg) {
	return "BatchX requires at least two arguments to run.";
}