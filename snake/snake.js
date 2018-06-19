var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x1b3347;
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var rect = new PIXI.Graphics();
stage.addChild(rect);

// var stats = new Stats;
// var width = stats.domElement.offsetWidth;
// stats.setMode(0);
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = window.innerWidth - 80 + 'px';
// stats.domElement.style.top = 0 + 'px';
// document.body.appendChild(stats.domElement);

var width = 30,
		height = 30,
		speed = 0.1,
		dataField = new Array(height),
		lengthSnake = 4,
		direction = 'down',
		lastDirection = '',
		snake = new Array(lengthSnake + 1),
		food = {x : 10, y : 3};

init();

var lastTime = Date.now(),
counter = 0;
function animate() {
	// stats.begin();
	var now = Date.now();
	var dt = now - lastTime;
	counter += dt;

	if(counter/1000 >= speed) {
		update();
		render();
		counter = 0;
	}

	lastTime = now;
	renderer.render(stage);
	// stats.end();
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function update() {
	// _direction = bot(dataField, {x : snake[lengthSnake].x, y : snake[lengthSnake].y}, {x : food.x, y : food.y});console.log(_direction);
	// switch(_direction){
	// 	case 'up':
	// 		if(direction != 'up' && direction != 'down')
	// 			direction = 'up';
	// 	break;
	// 	case 'left':
	// 		if(direction != 'left' && direction != 'right')
	// 			direction = 'left';
	// 	break;
	// 	case 'down':
	// 		if(direction != 'down' && direction != 'up')
	// 			direction = 'down';
	// 	break;
	// 	case 'right':
	// 		if(direction != 'right' && direction != 'left')
	// 			direction = 'right';
	// 	break;
	// }

	clearSnake();
	setSnake();

	if(isTakeFood()) {
		dataField[food.y][food.x] = 1;
		setFood();
		var newBlock = {x : snake[0].x, y : snake[0].y};
		snake.unshift(newBlock);
		lengthSnake++;
	}

	if(isColision()) {
		init();
	}
}

function clearSnake() {
	for(var i = 0; i < snake.length; i++) {
		dataField[snake[i].y][snake[i].x] = 0;
	}
}

function setSnake() {
	for(var i = 0; i < snake.length; i++) {
		if(i < lengthSnake) {
			snake[i] = {x : snake[i+1].x, y : snake[i+1].y};
			dataField[snake[i].y][snake[i].x] = 1;
		}	else {
			switch(direction) {
				case 'right':
					snake[lengthSnake].x = snake[lengthSnake].x == width-1 ? 0 : snake[lengthSnake].x+1;
				break;
				case 'down':
					snake[lengthSnake].y = snake[lengthSnake].y == height-1 ? 0 : snake[lengthSnake].y+1;
				break;
				case 'left':
					snake[lengthSnake].x = snake[lengthSnake].x == 0 ? width-1 : snake[lengthSnake].x-1;
				break;
				case 'up':
					snake[lengthSnake].y = snake[lengthSnake].y == 0 ? height-1 : snake[lengthSnake].y-1;
				break;
			}
			dataField[snake[i].y][snake[i].x] = 2;
		}
	}
}

function init() {
	dataField = new Array(height),
	startPos = {x : 5, y : 2},
	direction = 'right',
	lengthSnake = 4,
	lastDirection = '',
	snake = new Array(lengthSnake + 1);

	for(var y = 0; y < height; y++) {
		dataField[y] = new Array(width);
		for(var x = 0; x < width; x++) {
			dataField[y][x] = 0;
		}
	}
	dataField[3][10] = 3;
	for(var i = 0; i <= lengthSnake; i++) {
		if(i < lengthSnake) {
			snake[i] = {x : startPos.x-lengthSnake+i, y : startPos.y};
			dataField[snake[i].y][snake[i].x] = 1;
		}	else {
			snake[i] = startPos;
			dataField[snake[i].y][snake[i].x] = 2;
		}
	}

	// setFood();
}

function isTakeFood() {
	for(var i = 0; i < lengthSnake; i++) {
		if(snake[i].x == food.x && snake[i].y == food.y) {
			return true;
		}
	}

	return false;
}

function isColision() {
	for(var i = 0; i < lengthSnake; i++) {
		if(snake[i].x == snake[lengthSnake].x && snake[i].y == snake[lengthSnake].y)
			return true;
	}

	return false;
}

function render() {
	rect.clear();
	var w = (window.innerWidth - 17*width)/2;
	var h = (window.innerHeight - 17*height)/2;
	
	for(var y = 0; y < height; y++) {
		for(var x = 0; x < width; x++) {
			switch(dataField[y][x]) {
				case 0:
				rect.beginFill(0x000000);
				break;
				case 1:
				rect.beginFill(0xAAAAAA);
				break;
				case 2:
				rect.beginFill(0xFFFFFF);
				break;
				case 3:
				rect.beginFill(0x77FF33);
				break;
			}
			rect.lineStyle(1, 0xFF3300, 0);
			rect.drawRect(x*17+w, y*17+h, 15, 15);
		}
	}

	rect.endFill();
}

function setFood() {
	var _x = rand(0, width - 1);
	var _y = rand(0, height - 1);
	if(dataField[_y][_x] != 0){
		return setFood();
	}else{
		dataField[_y][_x] = 3;
		food = {x : _x, y : _y}
		return;
	}
}

function rand(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.onkeyup = function(e){
	var code = e.keyCode;
	code = code == 87 || code == 38 ? 'up' : code;
	code = code == 65 || code == 37 ? 'left' : code;
	code = code == 83 || code == 40 ? 'down' : code;
	code = code == 68 || code == 39 ? 'right' : code;
	// console.log(code);
	switch(code){
		case 'up':
			if(direction != 'up' && direction != 'down')
				direction = 'up';
		break;
		case 'left':
			if(direction != 'left' && direction != 'right')
				direction = 'left';
		break;
		case 'down':
			if(direction != 'down' && direction != 'up')
				direction = 'down';
		break;
		case 'right':
			if(direction != 'right' && direction != 'left')
				direction = 'right';
		break;
		case 80:
			game = game == 1 ? 0 : 1;
			get("pause").style.display = game == 1 ? 'none' : 'block';
		break;
	}

	return null;
}