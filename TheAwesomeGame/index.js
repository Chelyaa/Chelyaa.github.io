/*
* green: #155625 #0d3517
* red: #4f1a1a #381212
*/
init(20, 20, [['#4f1a1a', '#381212'], ['#155625', '#0d3517']]);

var currX, currY;
function init(width, height, colors) {
	var field = new Array(height);
	for(var i = 0; i < field.length; i++) {
		field[i] = new Array(width);
		for(var j = 0; j < field[i].length; j++) {
			field[i][j] = 0;
		}
	}

	var x = Math.floor(Math.random() * width);
	var y = Math.floor(Math.random() * height);
	field[y][x] = 1;

	currX = Math.floor(Math.random() * width);
	currY = Math.floor(Math.random() * height);
	var coords = {x: 0, y: 0};

	var room = createRoom(field, colors);

	showCoords(coords);
	goToArea(coords, room);
}

function createRoom(field, colors) {
	var table = document.createElement('table');
	document.getElementById('canvas').appendChild(table);
	table.style.width = window.innerWidth * field[0].length + 'px';

	var tr, td;
	for(var y = 0; y < field.length; y++) {
		tr = document.createElement('tr');
		for(var x = 0; x < field[y].length; x++) {
			td = document.createElement('td');
			tr.appendChild(td);

			td.style.width = window.innerWidth + 'px';
			td.style.height = window.innerHeight - 50 + 'px';
			if(field[y][x] == 1) {
				td.style.border = '25px solid ' + colors[1][1];
				td.style.backgroundColor = colors[1][0];
			} else {
				td.style.border = '25px solid ' + colors[0][1];
				td.style.backgroundColor = colors[0][0];
			}
		}

		table.appendChild(tr);
	}

	return table;
}
function goToArea(coords, room) {
	document.body.scrollLeft = window.innerWidth * coords.x;
	document.body.scrollTop = window.innerHeight * coords.y;
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

	goToArea()
}

function showCoords(coords) {
	var x = coords.x.toString().length == 1 ? '0' + coords.x : coords.x;
	var y = coords.y.toString().length == 1 ? '0' + coords.y : coords.y;
	document.getElementById('coords').innerHTML = x + "-" + y;
}

document.addEventListener("keypress", function(e) {
	var code = e.charCode || e.keyCode;
	switch(code) {
		case 119:
			goTo('up');
			break;
		case 115:
			goTo('down');
			break;
		case 100:
			goTo('right');
			break;
		case 97:
			goTo('left');
			break;
	}
});