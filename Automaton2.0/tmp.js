// var canvas = new SimpleGE('canvas');

// var width = window.innerWidth;
// var height = window.innerHeight;
// canvas.canvas.width = width;
// canvas.canvas.height = height;
// var scene = canvas.Scene.createScene();
// setBgc("#015C57", scene);

// var stats = createStats();

// var wB = 5;
// var hB = 5;
// var wA = 60;
// var hA = 60;
// var speed = 10;
// var counter = 0;
// var generation = 0;
// var end = 0;
// var globalFlag = 1;
// var generationEl = document.getElementById("generation-text");
// var x = Math.ceil(width/2)-Math.ceil(wB*wA/2);
// var y = 100;

// var startPatt1  = [[0, 1, 0],
// 									 [0, 0, 1],
// 									 [1, 1, 1]];

// var startPatt2 = [[0, 1, 1],
// 									[1, 1, 0],
// 									[0, 1, 0]];

// var startPatt3 = [[0, 1, 0, 0, 0, 0, 0],
// 									[0, 0, 0, 1, 0, 0, 0],
// 									[1, 1, 0, 0, 1, 1, 1]];

// var startPatt4 = [[0, 1, 0],
// 									[1, 1, 1],
// 									[0, 1, 0],
// 									[0, 1, 0]];

// var startPatt5 = [[1, 0, 1],
// 									[1, 1, 1],
// 									[1, 0, 1]];

// var startPatts = [startPatt1, startPatt2, startPatt3, startPatt4, startPatt5];
// // var arrMaton = generateRandArr(wA, hA, 0.3);
// var arrMaton = generateArrByStartPattern(wA, hA, [[0, 1, 0], [0, 1, 0], [0, 1, 0]]);

// var Automaton = new Automaton(arrMaton[0].length, arrMaton.length, arrMaton, wB, hB, scene, x, y);
// Automaton.renderGeneration();

// var gui = new GUI(Automaton, canvas, {"play" : 'play', "prev" : 'prev', "next" : 'next'});

// function update(dt){
// 	if(counter >= 1/speed){
// 		Automaton.renderGeneration();
// 		var isEnd = Automaton.step();

// 		if(!isEnd && !end){
// 			console.log("End: " + generation);
// 			end = 1;
// 		}

// 		if(!end){
// 			generation++;
// 			generationEl.innerHTML = generation;
// 		}

// 		counter = 0;
// 	}
// }

// var lastTime = Date.now();
// function animate(){
// 	stats.begin();

// 	var now = Date.now();
// 	var dt = (now - lastTime) / 1000.0;
// 	counter += dt;

// 	if(globalFlag){
// 		update(dt);
// 		canvas.renderCanvas();
// 	}

// 	lastTime = now;
// 	stats.end();
// 	requestAnimationFrame(animate);
// }
// requestAnimationFrame(animate);