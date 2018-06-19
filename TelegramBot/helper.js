var fs = require('fs');

var Helper = function(){

}

Helper.prototype.isUniqueLogin = function(params) {
	var users = require('./data/user.json');

	for(var i in users){
		if(i == params[0])
			return false;
	}

	return true;
}

Helper.prototype.createUser = function(params) {
	var usersData = require('./data/user.json');

	var login = decodeURIComponent(params[0]);
	var pass = decodeURIComponent(params[1]);
	var firstName = decodeURIComponent(params[2]);
	var lastName = decodeURIComponent(params[3]);
	var phone = decodeURIComponent(params[4]);

	user = {
		"login" : login,
		"password" : pass,
		"firstname" : firstName,
		"lastname" : lastName,
		"phonenumber" : phone
	}


	usersData[login] = user;

	var users = JSON.stringify(usersData);

	fs.writeFileSync('data/user.json', users);
	return "OK";
}

Helper.prototype.createOrder = function(params) {
	var ordersData = require('./data/order.json');
	var login = decodeURIComponent(params[0]);
	var numberOrder = decodeURIComponent(params[1]);
	var packageServices = decodeURIComponent(params[2]);
	var cost = decodeURIComponent(params[3]);
	var manager = decodeURIComponent(params[4]);
	var phoneOfManager = decodeURIComponent(params[5]);
	var status = decodeURIComponent(params[6]);

	order = {
		"login" : login,
		"numberOrder" : numberOrder,
		"packageServices" : packageServices,
		"cost" : cost,
		"manager" : manager,
		"phoneOfManager" : phoneOfManager,
		"statusWork" : status
	}

// console.log(order);
	ordersData[numberOrder] = order;

	var orders = JSON.stringify(ordersData);

	fs.writeFileSync('data/order.json', orders);

	var ordersData = require('./data/order.json');
	return "OK";
}

Helper.prototype.getOrdersByLogin = function(params){
	var loginUser = params[0];
	var orders = require('./data/order.json');

	var ordersUser = [];
	for(var order in orders){
		if(orders[order].login == loginUser){
			ordersUser.push(orders[order]);
		}
	}
	return ordersUser;
}

Helper.prototype.isPassValid = function(params){
	var users = require('./data/user.json');
	var login = params[0];
	var pass = params[1];

	for(var user in users){
		if(user == login){
			if(users[user].password == pass){
				return 1;
			}else{
				return 0;
			}
		}
	}
}

module.exports = Helper;
