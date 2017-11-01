var canvas = document.getElementsByTagName("canvas")[0];
var wB = 5,
		hB = 5,
		w = 1000,
		h = 1000;
var maze = [],
		stack = [],
		currentCell;

var state = [],
		lastCell = [];

w = w % 2 == 0 ? w-1 : w;
h = h % 2 == 0 ? h-1 : h;
var	cellCount = 0;
for(var i = 0; i < w; i++) {
	for(var j = 0; j < h; j++) {
		if(i % 2 == 0 && j % 2 == 0)
			cellCount++;
	}
}
var unvisitedCount = cellCount;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	noStroke();
	// noLoop();
	maze = new Array(w);
	for(var x = 0; x < maze.length; x++) {
		maze[x] = new Array(h);
		for(var y = 0; y < maze[x].length; y++) {
			if((x % 2 == 0 && y % 2 == 0)) 
				maze[x][y] = [1, 0];
			else
				maze[x][y] = 0;
		}
	}

	currentCell = [0, 0];
	start = Date.now();
	end = false;
	generate();
}

function draw() {
	fill('#FFFFFF');
	rect(wB+lastCell[0]*wB, hB+lastCell[1]*hB, wB, hB);
	fill('#FF0000');
	rect(wB+state[0][0]*wB, hB+state[0][1]*hB, wB, hB);
	if(state[1]) {
		fill('#FFFFFF');
		rect(wB+state[1][0]*wB, hB+state[1][1]*hB, wB, hB);

		var dx = state[1][0] - state[0][0],
				dy = state[1][1] - state[0][1];

		dx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
		dy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
		fill('#FFFFFF');
		rect(wB+(state[0][0]+dx)*wB, hB+(state[0][1]+dy)*hB, wB, hB);
	}

	lastCell = state[0];

	if(unvisitedCount > 0) {
		generate();
	} else if(!end){
		end = true;
		console.log("time: " + (Date.now() - start));
	}
}

function generate() {
	// states.push(maze);
	var unvisitedNeighbors = getUnvisitedNeighbors(getNeighbors(currentCell, maze), maze);
	if(unvisitedNeighbors.length != 0) {
		stack.push(currentCell);

		var neighborCell = unvisitedNeighbors[randomInt(0, unvisitedNeighbors.length)];
		maze = removeWall(currentCell, neighborCell, maze);

		state = [currentCell, neighborCell];
		currentCell = neighborCell;
		maze[currentCell[0]][currentCell[1]][1] = 1;
		unvisitedCount--;
	}	else if(stack.length > 0) {
		currentCell = stack[stack.length-1];
		stack.pop();
		state = [currentCell];
	} else {
		currentCell = getRandomUnvisitedCell(maze);
	}
}

function getUnvisitedNeighbors(neighbors, maze) {
	var unvisitedNeighbors = [];
	for(var i = 0; i < neighbors.length; i++) {
		var cellCoords = neighbors[i],
				cell = maze[cellCoords[0]][cellCoords[1]];
		if(cell[1] == 0)
			unvisitedNeighbors.push(neighbors[i]);
	}

	return unvisitedNeighbors;
}

function getNeighbors(cell, maze) {
	var neighbors = [], 
			x = cell[0], 
			y = cell[1];

	if(maze[x][y-2] !== undefined)
		neighbors.push([x, y-2]);
	if(maze[x+2] !== undefined)
		neighbors.push([x+2, y]);
	if(maze[x][y+2] !== undefined)
		neighbors.push([x, y+2]);
	if(maze[x-2] !== undefined)
		neighbors.push([x-2, y]);

	return neighbors;
}

function removeWall(p1, p2, maze) {
	var dx = p2[0] - p1[0],
			dy = p2[1] - p1[1];

	dx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
	dy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
	maze[p1[0]+dx][p1[1]+dy] = 1;

	return maze;
}

function getRandomUnvisitedCell(maze) {
	for(var x = 0; x < maze.length; x++) {
		for(var y = 0; y < maze[x].length; y++) {
			if(maze[x][y][1] == 0)
				return [x, y];
		}
	}
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

var zoomLevel = 1;
function mouseWheel(e) {
	var delta = -e.delta || 0;
	var zoom = delta/1000;
	zoomLevel += zoom;
	zoomLevel = zoomLevel < 0.3 ? 0.3 : zoomLevel > 1 ? 1 : zoomLevel;
  canvas.style.transform = "scale(" + zoomLevel + ", " + zoomLevel + ")";
}

function keyPressed() {
	var canvasCoords = getOffsetRect(canvas);
	switch(keyCode) {
		case 87: //up
			canvas.style.top = canvasCoords.top + 10 + 'px';
			break;
		case 65: //left
			canvas.style.left = canvasCoords.left + 10 + 'px';
			break;
		case 83: //down
			canvas.style.top = canvasCoords.top - 10 + 'px';
			break;
		case 68: //right
			canvas.style.left = canvasCoords.left - 10 + 'px';
			break;
	}
}
function keyIsDown() {
	var canvasCoords = getOffsetRect(canvas);
	switch(keyCode) {
		case 119: //up
			canvas.style.top = canvasCoords.top + 10 + 'px';
			break;
		case 97: //left
			canvas.style.left = canvasCoords.left + 10 + 'px';
			break;
		case 115: //down
			canvas.style.top = canvasCoords.top - 10 + 'px';
			break;
		case 100: //right
			canvas.style.left = canvasCoords.left - 10 + 'px';
			break;
	}
}

document.addEventListener("keydown", keyIsDown);
document.addEventListener("mousewheel", mouseWheel);

function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect()
     
  var body = document.body
  var docElem = document.documentElement
     
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
     
  var clientTop = docElem.clientTop || body.clientTop || 0
  var clientLeft = docElem.clientLeft || body.clientLeft || 0
     
  var top  = box.top +  scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft
     
  return { top: Math.round(top), left: Math.round(left) }
}
