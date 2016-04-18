// this function just makes things shorter
var fs = require('fs');
exports.njs_write = function(w) {
	process.stdout.write(w);
}

//
exports.throwError = function(string, error) {
	throw string;
}

// deletes html folder
exports.deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};
