var fs = require('fs');

var F = function(){

}

F.prototype.getFile = function(path){
	return fs.readFileSync(path, 'utf8')
}

F.prototype.writeFIle = function(path, content){
	fs.writeFileSync(path, content)
}

