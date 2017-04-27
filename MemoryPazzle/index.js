var table = document.getElementById("table"),
		colors = ["red", "blue", "yellow", "green"],
		field = new Array(2);

init();

function init() {
	for(var i = 0; i < field.length; i++) {
		field[i] = new Array(8);
	}

	generateField();
	console.log(field);
}

function setListeners() {
	var flippers = document.getElementsByClassName("card");
	for(var i = 0; i < flippers.length; i++) {
		flippers[i].onclick = function() {
			if(!this.static)
				this.classList.toggle('flipped');
		}
	}
}

function generateField() {
	(function recurse(color, field) {
   	var x = random(0, 8);
   			y = random(0, 2);

   	if(field[y][x] === undefined) {
   		field[y][x] = colors[color];
   		if(!findColorInField(colors[color]))
   			color++;
   	} else {
   		recurse(color);
   	}

   	if(color > 3)
   		return;
  	else 
  		recurse(color);
  })(0);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function findColorInField(color) {
	var c = 0;
	for(var i = 0; i < field.length; i++) {
		for(var j = 0; j < field[i].length; j++) {
			if(field[i][j] === color)
				c++;
		}
	}
	console.log(c);
	if(c == 2)
		return false;
	else 
		return true;
}