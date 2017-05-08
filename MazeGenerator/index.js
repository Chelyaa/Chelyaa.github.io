var wB = 25,
		hB = 25,
		w = Math.floor(window.innerWidth/wB)-1,
		h = Math.floor(window.innerHeight/hB)-1;
		// w = 80,
		// h = 20;
var maze = [],
		stack = [],
		currentCell;

var states = [];

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

console.log("Width: " + w);
console.log("Height: " + h);

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
	for(var x = 0; x < maze.length; x++) {
		for(var y = 0; y < maze[x].length; y++) {
			if(x == currentCell[0] && y == currentCell[1]) {
				fill('#00FF00');
			} else if(maze[x][y] == 1 || maze[x][y][1] == 1) {
				// fill('#FF1E64');
				fill('#FFFFFF');
			} else if(maze[x][y][1] == 0) {
				fill('black');
			} else {
				fill('black');
			}

			rect(wB+x*wB, hB+y*hB, wB, hB);
		}
	}
	if(unvisitedCount > 0) {
		generate();
	} else if(!end){
		end = true;
		console.log("time: " + (Date.now() - start));
	}
}

function generate() {
	states.push(maze);
	var unvisitedNeighbors = getUnvisitedNeighbors(getNeighbors(currentCell, maze), maze);
	if(unvisitedNeighbors.length != 0) {
		stack.push(currentCell);

		var neighborCell = unvisitedNeighbors[randomInt(0, unvisitedNeighbors.length)];
		maze = removeWall(currentCell, neighborCell, maze);

		currentCell = neighborCell;
		maze[currentCell[0]][currentCell[1]][1] = 1;
		unvisitedCount--;
	}	else if(stack.length > 0) {
		currentCell = stack[stack.length-1];
		stack.pop();
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

// function unvisitedCount(maze) {
// 	var count = 0;
// 	for(var x = 0; x < maze.length; x++) {
// 		for(var y = 0; y < maze[x].length; y++) {
// 			if(maze[x][y][1] == 0)
// 				count++;
// 		}
// 	}

// 	return count;
// }

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
