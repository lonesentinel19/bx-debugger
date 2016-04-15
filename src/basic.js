// this function just makes things shorter
exports.njs_write = function(w) {
	process.stdout.write(w);
}

//
exports.throwError = function(string, error) {
	throw string;
}