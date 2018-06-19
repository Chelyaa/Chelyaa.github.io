var http = require('http');
var static = require('node-static');
var file = new(static.Server)('.');
var fs = require('fs');
var utf8 = require('utf8');
var connect = require('connect');
var serveStatic = require('serve-static');

var Helper = require('./helper');
var helper = new Helper();

var Bot = require('./bot');

var port = 8081;
var server = connect();

server.use(response);
server.use(serveStatic(__dirname));
server.listen(port);

console.log('Server running on port ' + port);

function response(request, response, next){
	// response.setHeader(200, {'Content-Type', 'text/plain'});

  var method = request.method;
  var url = request.url;

  if(method == 'GET'){
    console.log(url);
	  url = url.split('/');

		var func = url[1];
		var params = [];
	 	for(var i = 0; i < url.length - 2; i++){
		  params.push(url[i+2]);
		}
		switch(func){
			case 'isUnique':
		  	var isUnique = isUniqueLogin(params) == false ? '0' : '1';
		  	response.end(isUnique);
			break;
			case 'createUser':
			  var isUnique = isUniqueLogin(params) == false ? '0' : '1';
			  if(isUnique == '0')
			  	response.end("Login is not unique");

			  response.end(createUser(params));
			break;
			case 'createOrder':
			  response.end(createOrder(params));
			break;
		}

  }else{
  	console.log('Failed method');
  }

  next();
}

function isUniqueLogin(params){
	return helper.isUniqueLogin(params);
}
function createUser(params){
	return helper.createUser(params);
}
function createOrder(params){
	return helper.createOrder(params);
}
