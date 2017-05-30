var width = 20,
		height = 20,
		field = new Array(width);
for (var i = 0; i < field.length; i++) {
	field[i] = new Array(height);
	for (var j = 0; j < field[i].length; j++) {
		field[i][j] = 0;
	}
}

var x = Math.floor(Math.random() * width),
		y = Math.floor(Math.random() * height);

field[x][y] = 1;

var currX = Math.floor(Math.random() * width),
		currY = Math.floor(Math.random() * height);

init();

function init() {
	renderRoom(createRoom(currX, currY));
	showCoords(currX, currY);
}
function createRoom(x, y) {
	var value = field[x][y],
			room = document.createElement('div');

	room.classList.add('room');
	room.style.width = window.innerWidth - 40 + 'px';
	room.style.height = window.innerHeight - 40 + 'px';

	if(value) {
		room.classList.add('vin');
		room.style.backgroundColor = '#155625';
		room.style.border = '20px solid #0d3517';
	} else {
		room.classList.add('empty');
		room.style.backgroundColor = '#4f1a1a';
		room.style.border = '20px solid #381212';
	}

	return room;
}
function renderRoom(room) {
	var canvas = document.getElementById("canvas");
	canvas.innerHTML = '';
	canvas.appendChild(room);
	showBorders(currX, currY);
}
function goTo(direction) {
	switch(direction) {
		case 'up':
			if(currY > 0)
				currY--;
			break;
		case 'right':
			if(currX < field.length - 1)
				currX++;
			break;
		case 'down':
			if(currY < field[0].length - 1)
				currY++;
			break;
		case 'left':
			if(currX > 0)
				currX--;
			break;
	}

	showCoords(currX, currY);
	renderRoom(createRoom(currX, currY));
	showBorders(currX, currY);
}

function showBorders(x, y) {
	var up = document.getElementById('up'),
			right = document.getElementById('right'),
			down = document.getElementById('down'),
			left = document.getElementById('left');

	up.style.display = 'none';
	right.style.display = 'none';
	down.style.display = 'none';
	left.style.display = 'none';
	if(x == 0)
		left.style.display = 'block';
	if(x == field.length - 1)
		right.style.display = 'block';
	if(y == 0)
		up.style.display = 'block';
	if(y == field[0].length - 1)
		down.style.display = 'block';
}

function showCoords(x, y) {
	var str = "X: " + x + " Y: " + y;
	document.getElementById('coords').innerHTML = str;
}

document.addEventListener("keypress", function(e) {
	var code = e.charCode || e.keyCode;
	switch(code) {
		case 119://up
			goTo('up');
			break;
		case 115://down
			goTo('down');
			break;
		case 100://right
			goTo('right');
			break;
		case 97://left
			goTo('left');
			break;
	}
});