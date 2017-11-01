function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

update();

let foxFood = 1,
		foxPop = 2,
		foxOff = 3,
		rabPop = 180,
		rabOff = 10,
		history = [];

var lastTime = Date.now(),
		day = 1000,
		days = 0,
		counter = 0;
function update() {
	let now = Date.now(),
			dt = now - lastTime;
	counter += dt;

	if(counter >= day) {
		counter = 0;
		frame();
	}

	lastTime = now;
	requestAnimationFrame(update);
}

function frame() {
	days++;
	history.push([foxPop, rabPop]);
	showData();
	if(days % 30 == 0) {
		let _foxPop = foxPop % 2 != 0 ? foxPop - 1 : foxPop,
				_rabPop = rabPop % 2 != 0 ? rabPop - 1 : rabPop;

		for(let i = 0; i < _foxPop/2; i++) {
			foxPop += random(0, foxOff+1);
		}

		for(let i = 0; i < _rabPop/2; i++) {
			rabPop += random(0, rabOff+1);
		}
	}

	rabPop -= foxPop * foxFood;
	foxPop = rabPop < 0 ? foxPop + rabPop : foxPop;
	rabPop = rabPop < 0 ? 0 : rabPop;
}

function showData() {
	count = history.length < 100 ? history.length : 100;

	for (var j = 0; j < count; j++) {
		let yVal = history[j][0];
		foxCh.push({
			x: days,
			y: yVal
		});
	}

	for (var j = 0; j < count; j++) {
		let yVal = history[j][1];
		rabCh.push({
			x: days,
			y: yVal
		});
	}

	if(foxCh.length > 100) {
		foxCh.shift();
	}

	if(rabCh.length > 100) {
		rabCh.shift();
	}


	chart.render();
}

function logData() {
	console.log("Day: " + (days+1) + " Fox: " + foxPop + " Rabbit: " + rabPop);
}