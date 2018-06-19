function bot(fieldGame, p1, p2) {
	var field = new Array(fieldGame.length),
			Ni = 0;
	for(var i = 0; i < field.length; i++) {
		field[i] = new Array(fieldGame[0].length);
		for(var j = 0; j < field[i].length; j++) {
			switch(fieldGame[i][j]) {
				case 0:
					field[i][j] = 254;
				break;
				case 1:
					field[i][j] = 255;
				break;
				case 2:
					field[i][j] = 253;
				break;
				case 3:
					field[i][j] = 0;
				break;
			}
		}
	}
	
}

function checkZone(p1, p2) {
	if(p1.x < p2.x && p1.y > p2.y)
		return 1;
	if(p1.x > p2.x && p1.y > p2.y)
		return 2;
	if(p1.x > p2.x && p1.y < p2.y)
		return 3;
	if(p1.x < p2.x && p1.y < p2.y)
		return 4;
	// if(p1.x > p2.x)
	// 	return 'left';
	// if(p1.x < p2.x)
	// 	return 'right';
	// if(p1.y > p2.y)
	// 	return 'down';
	// if(p1.y < p2.y)
	// 	return 'up';
}

function getDirection(p1, p2) {
	if(p1.x > p2.x)
		return 'left';
	if(p1.x < p2.x)
		return 'right';
	if(p1.y > p2.y)
		return 'up';
	if(p1.y < p2.y)
		return 'down';
	if(p1.x === p2.x) {
		if(p1.y < p2.y)
			return "down";
		if(p1.y > p2.y)
			return "up";
	}
	if(p1.y === p2.y) {
		if(p1.x < p2.x)
			return "left";
		if(p1.x < p2.x)
			return "right";
	}
}

function getNeighbours(p, field) {
	var nebours = [],
			width = field[0].length,
			height = field.length;
	
	if(p.x == 0) {
		nebours.push({x : width-1, y : p.y});
	} else {
		nebours.push({x : p.x-1, y : p.y});
	}
	if(p.x == width-1) {
		nebours.push({x : 0, y : p.y});
	} else {
		nebours.push({x : p.x+1, y : p.y});
	}
	if(p.y == 0) {
		nebours.push({x : p.x, y : height-1});
	} else {
		nebours.push({x : p.x, y : p.y-1});
	}
	if(p.y == height-1) {
		nebours.push({x : p.x, y : 0});
	} else {
		nebours.push({x : p.x, y : p.y+1});
	}

	for(var i = 0; i < nebours.length; i++) {
		if(field[nebours[i].y][nebours[i].x] != 0 && field[nebours[i].y][nebours[i].x] != 3) 
			nebours.splice(i, 1);
	}

	return nebours;
}


// function bot(field, p1, p2) {
	// var paths = [[p1]],
	// 		nebours = getNeighbours(p1, field);

	// for(var i = 0; i < nebours.length; i++) {
	// 	if(nebours[i].x == p2.x && nebours[i].y == p2.y)
	// 		return getDirection(p1, nebours[i]);
	// }

	// var zone = checkZone(p1, p2);console.log(zone);

	// for(var i = 0; i < nebours.length; i++) {
	// 	var nebour = nebours[i];
	// 	switch(zone) {
	// 		case 1:
	// 			if(nebour.x > p1.x && nebour.y < p1.y)
	// 				return getDirection(p1, nebour);
	// 		break;
	// 		case 2:
	// 			if(nebour.x < p1.x && nebour.y < p1.y)
	// 				return getDirection(p1, nebour);
	// 		break;
	// 		case 3:
	// 			if(nebour.x < p1.x && nebour.y > p1.y)
	// 				return getDirection(p1, nebour);
	// 		break;
	// 		case 4:
	// 			if(nebour.x > p1.x && nebour.y > p1.y)console.log("A");
	// 				return getDirection(p1, nebour);
	// 		break;
	// 	}
	// }

	// for(var i = 0; i < paths.length; i++) {
	// 	var path = paths[i];
	// 	if(path[path.length-1].x == p2.x && path[path.length-1].y == p2.y) {
	// 		return getDirection(p1, path[1]);
	// 	}

	// 	var nebours = getNeighbours(path[path.length-1], field);
	// 	for(var j = 0; j < nebours.length; j++) {
	// 		var newPath = path.slice();
	// 		newPath.push({x : nebours[j].x, y : nebours[j].y});
	// 		paths.push(newPath);
	// 	}
	// }

	// return 'down';
// }