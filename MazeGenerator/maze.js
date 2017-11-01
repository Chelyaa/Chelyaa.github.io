function Maze(w = 200, h = 100, wB = 5, hB = 5) {
  this.wB = wB;
  this.hB = hB;
  this.w = w % 2 == 0 ? w-1 : w;
  this.h = h % 2 == 0 ? h-1 : h;
  this.maze = [];
  this.stack = [];
  this.currentCell = [0, 0];
  this.state = [];
  this.lastCell = [];
  this.unvisitedCount = ((this.w+1)/2) * ((this.h+1)/2);
  this.start;
  this.end;
}

Maze.prototype.reset = function() {
  this.maze = [];
  this.stack = [];
  this.currentCell = [0, 0];
  this.state = [];
  this.lastCell = [];
  this.unvisitedCount = ((this.w+1)/2) * ((this.h+1)/2);
  this.init();
  this.generate();
}

Maze.prototype.init = function() {
    this.maze = new Array(this.w);
    for(var x = 0; x < this.maze.length; x++) {
        this.maze[x] = new Array(this.h);
        for(var y = 0; y < this.maze[x].length; y++) {
            if((x % 2 == 0 && y % 2 == 0)) 
                this.maze[x][y] = [1, 0];
            else
                this.maze[x][y] = 0;
        }
    }

    this.start = Date.now();
    this.end = false;
}

Maze.prototype.generate = function() {
  var unvisitedNeighbors = this.getUnvisitedNeighbors(this.currentCell);
  if(unvisitedNeighbors.length != 0) {
      this.stack.push(this.currentCell);

      var neighborCell = unvisitedNeighbors[randomInt(0, unvisitedNeighbors.length)];

      this.state = [this.currentCell, neighborCell];
      this.currentCell = neighborCell;
      this.maze[this.currentCell[0]][this.currentCell[1]][1] = 1;
      this.unvisitedCount--;
  }	else if(this.stack.length > 0) {
      this.currentCell = this.stack[this.stack.length-1];
      this.stack.pop();
      this.state = [this.currentCell];
  } else {
      this.currentCell = this.getRandomUnvisitedCell();
  }
}

Maze.prototype.getNeighbors = function(cell) {
	var neighbors = [], 
		x = cell[0], 
		y = cell[1];
                                              
	if(this.maze[x][y-2] !== undefined)
		neighbors.push([x, y-2]);
	if(this.maze[x+2] !== undefined)
		neighbors.push([x+2, y]);
	if(this.maze[x][y+2] !== undefined)
		neighbors.push([x, y+2]);
	if(this.maze[x-2] !== undefined)
		neighbors.push([x-2, y]);

	return neighbors;
}

Maze.prototype.getUnvisitedNeighbors = function(cell) {
  var unvisitedNeighbors = [],
      neighbors = this.getNeighbors(cell);
  for(var i = 0; i < neighbors.length; i++) {
      var cellCoords = neighbors[i],
          cell = this.maze[cellCoords[0]][cellCoords[1]];
      if(cell[1] == 0)
          unvisitedNeighbors.push(neighbors[i]);
  }

  return unvisitedNeighbors;
}

Maze.prototype.removeWall = function(p1, p2) {
	var dx = p2[0] - p1[0],
		dy = p2[1] - p1[1];

	dx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
	dy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
	this.maze[p1[0]+dx][p1[1]+dy] = 1;;
}

Maze.prototype.getRandomUnvisitedCell = function() {
	for(var x = 0; x < this.maze.length; x++) {
		for(var y = 0; y < this.maze[x].length; y++) {
			if(this.maze[x][y][1] == 0)
				return [x, y];
		}
	}
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}