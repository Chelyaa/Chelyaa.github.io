var table = document.getElementById("table"),
		colors = ["red", "blue", "yellow", "green"],
		field = new Array(2);

init();

function init() {
	for(var i = 0; i < field.length; i++) {
		field[i] = new Array(8);
	}

	
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