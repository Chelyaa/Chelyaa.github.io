var field = document.getElementById('field');
var currentMacroField = 4;
var macroField = new Array(9);
var	f = new Array(9);
var tbs = [];
var step = 0;
var stepEl = document.getElementById('step');
stepEl.innerHTML = step ? "X" : "O";
stepEl.className = step ? "red" : "blue";

for(var i = 0; i < 9; i++) {
	macroField[i] = new Array(3);
	for(var j = 0; j < 3; j++) {
		macroField[i][j] = [[true, -1], [true, -1], [true, -1]];
	}
}

var table, tr, td, x, y;
for(var i = 0; i < 9; i++) {
	table = document.createElement('table');
	field.appendChild(table);
	for(var j = 0; j < 3; j++) {
		tr = document.createElement('tr');
		table.appendChild(tr);
		for(var k = 0; k < 3; k++) {
			td = document.createElement('td');
			x = k + 3 * (i - (Math.floor(i/3)*3));
			y = j + (Math.floor(i/3)*3);
			td.id = i + "-" + k + "-" + j;
			td.onclick = click;
			tr.appendChild(td);
		}
	}
	tbs.push(table);
}

setCurrentField(currentMacroField);

function click() {
	var coords = this.id.split('-');
	var cell = macroField[coords[0]][coords[2]][coords[1]];

	if(cell[0] && currentMacroField == coords[0]) {
		cell[0] = false;
		cell[1] = step;
		var isMicroVictory = microVictory(macroField[coords[0]]);
		
		if(isMicroVictory && f[currentMacroField] == undefined) {
			f[currentMacroField] = step;
			var table = tbs[currentMacroField];
			if(step)
				table.classList.add('x');
			else
				table.classList.add('o');

			var isMacroVictory = macroVictory(f);
			if(isMacroVictory) {
				if(step)
					alert("X wins!");
				else
					alert("O wins!");

				location.reload();
			}
		}
		
		this.innerHTML = step ? "X" : "O";
		this.className = step ? "red" : "blue";
		step = step ? 0 : 1;
		stepEl.innerHTML = step ? "X" : "O";
		stepEl.className = step ? "red" : "blue";
		var c = Number(coords[1]) + (3 * Number(coords[2]));
		setCurrentField(c);
	}
}

function setCurrentField(c) {
	var table = tbs[currentMacroField];
	table.classList.remove('current');
	table = tbs[c];
	table.classList.add('current');
	currentMacroField = c;
}

function microVictory(field) {
	if((field[0][0][1] == field[0][1][1]) && (field[0][1][1] == field[0][2][1]) && field[0][1][1] != -1)
		return true;
	if((field[0][2][1] == field[1][2][1]) && (field[2][2][1] == field[0][2][1]) && field[1][2][1] != -1) 
		return true;
	if((field[2][0][1] == field[2][1][1]) && (field[2][1][1] == field[2][2][1]) && field[2][1][1] != -1) 
		return true;
	if((field[0][0][1] == field[1][0][1]) && (field[2][0][1] == field[0][0][1]) && field[1][0][1] != -1) 
		return true;
	if((field[0][0][1] == field[1][1][1]) && (field[1][1][1] == field[2][2][1]) && field[1][1][1] != -1)
		return true;
	if((field[2][0][1] == field[1][1][1]) && (field[1][1][1] == field[0][2][1]) && field[1][1][1] != -1)
		return true;
	if((field[0][1][1] == field[1][1][1]) && (field[1][1][1] == field[2][1][1]) && field[1][1][1] != -1)
		return true;
	if((field[1][0][1] == field[1][1][1]) && (field[1][1][1] == field[1][2][1]) && field[1][1][1] != -1)
		return true;

	return false;
}

function macroVictory(field) {
	if((field[0] == field[1]) && (field[1] == field[2]) && field[1] != undefined)
		return true;
	if((field[2] == field[5]) && (field[5] == field[8]) && field[5] != undefined)
		return true;
	if((field[6] == field[7]) && (field[7] == field[8]) && field[7] != undefined)
		return true;
	if((field[0] == field[3]) && (field[3] == field[6]) && field[3] != undefined)
		return true;
	if((field[0] == field[4]) && (field[4] == field[9]) && field[4] != undefined)
		return true;
	if((field[2] == field[4]) && (field[4] == field[6]) && field[4] != undefined)
		return true;
	if((field[3] == field[4]) && (field[4] == field[5]) && field[4] != undefined)
		return true;
	if((field[1] == field[4]) && (field[4] == field[7]) && field[4] != undefined)
		return true;

	return false;
}