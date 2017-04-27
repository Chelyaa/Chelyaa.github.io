var Graphics = PIXI.Graphics,
		renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0x1d5272;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.render(stage);

var planet = new Graphics;
stage.addChild(planet);

var satellite = new Graphics;
stage.addChild(satellite);
var satelliteObj = {
	x: window.innerWidth/2,
	y: window.innerHeight/2-200,
	vx: 4,
	vy: 0,
	ay: 0.00001
}

var orbit = new Graphics;
stage.addChild(orbit);
var coords = [];
console.log(orbit.clearRect);
update();
function update() {
	planet.clear();
	satellite.clear();
	orbit.clear();

	planet.beginFill(0xe74c3c);
	planet.drawCircle(window.innerWidth/2, window.innerHeight/2, 40);
	planet.endFill();

	var sin = getSin({x: window.innerWidth/2, y: window.innerHeight/2}, satelliteObj),
			cos = getCos({x: window.innerWidth/2, y: window.innerHeight/2}, satelliteObj);
	satelliteObj.vy += satelliteObj.ay;
	satelliteObj.x += satelliteObj.vx * sin - satelliteObj.vy * cos;
	satelliteObj.y += satelliteObj.vy * sin + satelliteObj.vx * cos;
	coords.push({x: satelliteObj.x, y: satelliteObj.y});

	satellite.beginFill(0x000000);
	satellite.drawCircle(satelliteObj.x, satelliteObj.y, 5);
	satellite.endFill();

	if(isColision({x: window.innerWidth/2, y: window.innerHeight/2}, satelliteObj)) {
		satelliteObj.ay = 0;
		satelliteObj.vy = 0;
		satelliteObj.vx = 0;
	}

	for(var i = 0, l = coords.length; i < l; i++) {
		orbit.beginFill(0x60c5f7);
		orbit.drawCircle(coords[i].x, coords[i].y, 1);
		orbit.endFill();
	}

	if(coords.length > 110) {
		coords.shift();
	}
	document.getElementById("alt").innerHTML = getDistance({x: window.innerWidth/2, y: window.innerHeight/2}, satelliteObj);
	renderer.render(stage);
	requestAnimationFrame(update);
}

function getSin(p1, p2) {
	var dx = p2.x - p1.x,
			dy = p1.y - p2.y,
			d = Math.sqrt(dx*dx + dy*dy);

	return dy/d;
}

function getCos(p1, p2) {
	var dx = p2.x - p1.x,
			dy = p1.y - p2.y,
			d = Math.sqrt(dx*dx + dy*dy);

	return dx/d;
}

function getDistance(p1, p2) {
	var dx = p2.x - p1.x,
			dy = p1.y - p2.y,
			d = Math.sqrt(dx*dx + dy*dy);

	return Math.floor(d*1000)/1000;
}

function isColision(p1, p2) {
	if(p2.x > p1.x-40 && p2.x < p1.x+40) {
		if(p2.y > p1.y-40 && p2.y < p1.y+40) {
			return true;
		}
	}
}