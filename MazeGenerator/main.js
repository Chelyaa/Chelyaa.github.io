var maze = new Maze(20, 20);

function setup() {
	createCanvas(maze.wB*maze.w+maze.wB, maze.hB*maze.h+maze.hB);
	noStroke();
	maze.init();
  maze.generate();
}

function draw() {
	fill('#FFFFFF');
	rect(maze.wB+maze.lastCell[0]*maze.wB, maze.hB+maze.lastCell[1]*maze.hB, maze.wB, maze.hB);
	fill('#FF0000');
  	
	rect(maze.wB+maze.state[0][0]*maze.wB, maze.hB+maze.state[0][1]*maze.hB, maze.wB, maze.hB);
	if(maze.state[1]) {
		fill('#FFFFFF');
		rect(maze.wB+maze.state[1][0]*maze.wB, maze.hB+maze.state[1][1]*maze.hB, maze.wB, maze.hB);

		var dx = maze.state[1][0] - maze.state[0][0],
			dy = maze.state[1][1] - maze.state[0][1];

		dx = dx > 0 ? 1 : dx < 0 ? -1 : 0;
		dy = dy > 0 ? 1 : dy < 0 ? -1 : 0;
		fill('#FFFFFF');
		rect(maze.wB+(maze.state[0][0]+dx)*maze.wB, maze.hB+(maze.state[0][1]+dy)*maze.hB, maze.wB, maze.hB);
	}
	
	maze.lastCell = maze.state[0];
  if(maze.unvisitedCount > 0) {
		maze.generate();
	} else if(!maze.end){
		maze.end = true;
	}
}

function keyReleased() {
  if(key == 'R') {
  	clear();
  	maze.reset();
  }

  return false; 
}