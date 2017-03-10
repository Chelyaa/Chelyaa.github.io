var fs = require('fs');
var connect = require('connect');
var serveStatic = require('serve-static');

var server = connect();
var port = 8080;

server.use(response);
server.use(serveStatic(__dirname));
server.listen(port, function(){
    console.log('Server running on 8080...');
});

function response(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	
	next();
}