var pattern = "275836914318794265496512837829653741753148692641927583584379126162485379937261458".split('');

function generateSudoku(patt) {
	var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for(var i = 0; i < nums.length; i++) {
		nums.push(nums.splice((Math.random()*nums.length), 1)[0]);
	}
	
	var sudoku = [];
	for(var i = 0; i < 81; i++) {
		sudoku.push(nums[patt[i]-1]);
	}

	return sudoku;
}

sudoku();

function sudoku() {
	var field = generateSudoku(pattern),
			sudoku = createSudokuField(field);
	document.getElementById("sudoku").innerHTML = '';
	document.getElementById("sudoku").appendChild(sudoku);
}

function createSudokuField(sudoku) {
	var table = document.createElement('table');
	table.className = "sudoku";
	table.align = 'center';
	for(var i = 0; i < 3; i++) {
		var tr = document.createElement('tr');
		for(var j = 0; j < 3; j++) {
			var td = document.createElement('td');
			td.appendChild(createMicroField(getMicroField(j, i, sudoku)));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	return table;
}

function createMicroField(field) {
	var table = document.createElement('table');
	table.className = "microfield";
	for(var i = 0; i < field.length; i++) {
		var tr = document.createElement('tr');
		for(var j = 0; j < field[i].length; j++) {
			var td = document.createElement('td');
			td.innerHTML = field[i][j];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	return table;
}

function getMicroField(x, y, sudoku) {
	var startPoint = y*27 + x*3,
			microField = [[], [], []];

	microField[0][0] = sudoku[startPoint];
	microField[0][1] = sudoku[startPoint+1];
	microField[0][2] = sudoku[startPoint+2];
	microField[1][0] = sudoku[startPoint+9];
	microField[1][1] = sudoku[startPoint+9+1];
	microField[1][2] = sudoku[startPoint+9+2];
	microField[2][0] = sudoku[startPoint+18];
	microField[2][1] = sudoku[startPoint+18+1];
	microField[2][2] = sudoku[startPoint+18+2];

	return microField;
}

function getColumn(n, sudoku) {
	var column = [];
	for(var i = 0; i < 9; i++) {
		column.push(sudoku[n+i*9]);
	}

	return column;
}

function getRow(n, sudoku) {
	var row = [];
	for(var i = 0; i < 9; i++) {
		row.push(sudoku[n*9+i]);
	}

	return row;
}

function validateSudoku(sudoku) {
	return validateMicroFields(sudoku) && validateColumns(sudoku) && validateRows(sudoku);
}

function validateMicroFields(sudoku) {
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			var field = getMicroField(j, i, sudoku);
			field = field[0].concat(field[1]).concat(field[2]);
			if(!validateUniqueArr(field))
				return 0;
		}
	}

	return 1;
}

function validateColumns(sudoku) {
	for(var i = 0; i < 9; i++) {
		var column = getColumn(i, sudoku);
		if(!validateUniqueArr(column))
			return 0;
	}

	return 1;
}

function validateRows(sudoku) {
	for(var i = 0; i < 9; i++) {
		var row = getRow(i, sudoku);
		if(!validateUniqueArr(row))
			return 0;
	}

	return 1;
}

function validateUniqueArr(arr) {
	for(var i = 0; i < arr.length; i++) {
		for(var j = 0; j < arr.length; j++) {
			if(i != j && arr[i] == arr[j]) 
				return 0;
		}
	}

	return 1;
}
document.getElementById('gs').onclick = function() {
	sudoku();
}