var table = document.getElementById('tb');
var width = 10;
var height = 10;
var sapperField = [];
var bombs = [];
var flags = [];

function init() {
	for(var i = 0; i < height; i++) {
		var tr = document.createElement('tr');
		tb.appendChild(tr);
		sapperField.push(Array(width));
		for(var j = 0; j < width; j++) {
			var td = document.createElement('td');
			td.className = "close";
			td.id = i + "-" + j;
			td.onclick = leftClick;
			td.oncontextmenu = rightClick;
			tr.appendChild(td);

			var isBomd = random(1, 100);
			isBomd = isBomd >= 90 ? true : false;

			if(isBomd)
				bombs.push([i, j]);

			sapperField[i][j] = [td, isBomd];
		}
	}
	console.log("Bombs: " + bombs.length);
	for(var i = 0; i < height; i++) {
		for(var j = 0; j < width; j++) {
			var neighbours = 0;
			neighbours += i > 0 && sapperField[i-1][j][1] == true ? 1 : 0;
			neighbours += i < height-1 && sapperField[i+1][j][1] == true ? 1 : 0;
			neighbours += j > 0 && sapperField[i][j-1][1] == true ? 1 : 0;
			neighbours += j < width-1 && sapperField[i][j+1][1] == true ? 1 : 0;
			neighbours += j > 0 && i > 0 && sapperField[i-1][j-1][1] == true ? 1 : 0;
			neighbours += i > 0 && j < width-1 && sapperField[i-1][j+1][1] == true ? 1 : 0;
			neighbours += i < height-1 && j > 0 && sapperField[i+1][j-1][1] == true ? 1 : 0;
			neighbours += i < height-1 && j < width-1 && sapperField[i+1][j+1][1] == true ? 1 : 0;
			
			sapperField[i][j][2] = neighbours;
			sapperField[i][j][3] = false;
			sapperField[i][j][4] = [i, j];
		}
	}
}

init();

function rightClick() {
	this.innerHTML = "f";
	return false;
}

function leftClick() {
	var id = this.id.split('-');
	var cell = sapperField[id[0]][id[1]];

	if(checkWin()) {
		alert("You win!");
		sapperField = [];
		bombs = [];
		flags = [];
		table.innerHTML = "";
		init();
	}
	if(cell[1]) {
		loseGame();
	}
	if(!cell[1]) {
		openCell(cell, id);
	}
}

function openCell(cell, id) {;
	cell[0].classList.remove('close');
	cell[0].classList.add('open');
	cell[3] = true;
	if(cell[2] > 0) {
		cell[0].innerHTML = cell[2];
		return;
	} else {
		var i = Number(id[0]);
		var j = Number(id[1]);
		var neighbours = getNeighbours(id);

		for(var i = 0, l = neighbours.length; i < l; i++) {
			if(neighbours[i] != 0) {
				if(neighbours[i][2] > 0) {
					neighbours[i][0].classList.remove('close');
					neighbours[i][0].classList.add('open');
					neighbours[i][0].innerHTML = neighbours[i][2];
					neighbours[i][3] = true;
				} else {
					openCell(neighbours[i], neighbours[i][4]);
				}
			}
		}
		return;
	}
}

function checkWin() {
	for(var i = 0; i < height; i++) {
		for(var j = 0; j < width; j++) {
			if(sapperField[i][j][3] == false && sapperField[i][1] != true) {
				return false;
			}
		}
	}

	return true;
}

function loseGame() {
	alert("You lose!");
	sapperField = [];
	bombs = [];
	flags = [];
	table.innerHTML = "";
	init();
}

function getNeighbours(id) {
	var i = Number(id[0]);
	var j = Number(id[1]);
	
	var neighbours = [];
	neighbours[0] = i > 0 && sapperField[i-1][j][3] != true ? sapperField[i-1][j] : 0;
	neighbours[1] = i < height-1 && sapperField[i+1][j][3] != true ? sapperField[i+1][j] : 0;
	neighbours[2] = j > 0 && sapperField[i][j-1][3] != true ? sapperField[i][j-1] : 0;
	neighbours[3] = j < width-1 && sapperField[i][j+1][3] != true ? sapperField[i][j+1] : 0;
	neighbours[4] = j > 0 && i > 0 && sapperField[i-1][j-1][3] != true ? sapperField[i-1][j-1] : 0;
	neighbours[5] = i > 0 && j < width-1 && sapperField[i-1][j+1][3] != true ? sapperField[i-1][j+1] : 0;
	neighbours[6] = i < height-1 && j > 0 && sapperField[i+1][j-1][3] != true ? sapperField[i+1][j-1] : 0;
	neighbours[7] = i < height-1 && j < width-1 && sapperField[i+1][j+1][3] != true ? sapperField[i+1][j+1] : 0;

	return neighbours;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}