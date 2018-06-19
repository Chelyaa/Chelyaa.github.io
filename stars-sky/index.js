var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var sky = new PIXI.Graphics();
stage.addChild(sky);

var stars = [];
for(var i = 0; i < window.innerWidth/100; i++) {
	for(var j = 0; j < window.innerHeight/100; j++) {
		var x = i * 100 + 7 - random(-30, 30);
		var y = j * 100 + 7 - random(-30, 30);
		var r = random(1, 5);
		
		stars.push({x: x, y: y, r: r});
	}
}
render();
var direction = 0;

function animate() {
	sky.clear();

	for(var i = 0; i < stars.length; i++) {
		stars[i].x += 5 * stars[i].r;

		if(stars[i].y >= window.innerHeight)
			stars[i].y = 0;
		if(stars[i].x <= 0)
			stars[i].x = window.innerWidth;
		if(stars[i].y <= 0)
			stars[i].y = window.innerHeight;
		if(stars[i].x >= window.innerWidth)
			stars[i].x = 0;
	}

	// switch(direction) {
	// 	case 'up':
	// 		for(var i = 0; i < stars.length; i++) {
	// 			stars[i].y += stars[i].r;
	// 			if(stars[i].y >= window.innerHeight)
	// 				stars[i].y = 0;
	// 		}
	// 		break;
	// 	case 'right':
	// 		for(var i = 0; i < stars.length; i++) {
	// 			stars[i].x -= stars[i].r;
	// 			if(stars[i].x <= 0)
	// 				stars[i].x = window.innerWidth;
	// 		}
	// 		break;
	// 	case 'down':
	// 		for(var i = 0; i < stars.length; i++) {
	// 			stars[i].y -= stars[i].r;
	// 			if(stars[i].y <= 0)
	// 				stars[i].y = window.innerHeight;
	// 		}
	// 		break;
	// 	case 'left':
	// 		for(var i = 0; i < stars.length; i++) {
	// 			stars[i].x += stars[i].r;
	// 			if(stars[i].x >= window.innerWidth)
	// 				stars[i].x = 0;
	// 		}
	// 		break;
	// }
	

	render();

	renderer.render(stage);
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function render() {
	for(var i = 0; i < stars.length; i++) {
		sky.beginFill(0xFFFFFF);
		sky.drawCircle(stars[i].x, stars[i].y, stars[i].r);
		sky.endFill();
	}
}

function moveSky(cursorX, cursorY) {
	var kx = -(cursorX - window.innerWidth/2) / window.innerWidth/2;
	var ky = -(cursorY - window.innerHeight/2) / window.innerHeight/2;
	for(var i = 0; i < stars.length; i++) {
		stars[i].x += 5 * kx * stars[i].r;
		stars[i].y += 5 * ky * stars[i].r;
	}
	// console.log(stars[0].x, stars[0].y);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function addCircle(x, y, r, color) {
	var circle = new PIXI.Container();
	var gr = new Graphics();
	gr.beginFill(color);
	gr.drawCircle(0, 0, r);
	gr.endFill();
	circle.position.x = x;
	circle.position.y = y;
	circle.addChild(gr);
	return circle;
}

// document.onmousemove = function(e) {
// 	moveSky(e.clientX, e.clientY);
// 	render();
// }

document.onkeydown = function(e) {
	var code = e.keyCode;
	code = code == 87 || code == 38 ? 'up' : code;
	code = code == 65 || code == 37 ? 'left' : code;
	code = code == 83 || code == 40 ? 'down' : code;
	code = code == 68 || code == 39 ? 'right' : code;

	switch(code){
		case 'up':
				direction = 'up';
		break;
		case 'left':
				direction = 'left';
		break;
		case 'down':
				direction = 'down';
		break;
		case 'right':
				direction = 'right';
		break;
	}
}

document.onkeyup = function(e) {
	direction = 0;
}