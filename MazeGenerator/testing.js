function test(f, args, res) {
	var _res = f(...args);
	// if(_res != res) {
	// 	console.log("Error");
	// } else {
	// 	console.log("OK");
	// }

	console.log(_res);
}