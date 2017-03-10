var width = window.innerWidth;
var height = window.innerHeight;
var data = {
	wW : width,
	hW : height,
	speed : 10,
}
var app = new App(data);
app.graphEngine.canvas.width = width;
app.graphEngine.canvas.height = height;
app.functions.setBgc("#b1cae2");

var data = {
	wB : 5,
	hB : 5,
	width : 60,
	height : 60,
	x : 100,
	y : 100,
	arr : app.functions.generateArrByStartPattern(60, 60, app.startPatts[1]),
}
app.createAutomaton(data);

// var data = {
// 	wB : 5,
// 	hB : 5,
// 	width : 60,
// 	height : 60,
// 	x : 500,
// 	y : 100,
// 	arr : app.functions.generateArrByStartPattern(60, 60, app.startPatts[3]),
// }
// app.createAutomaton(data);


