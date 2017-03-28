var flippers = document.getElementsByClassName("flipper");

for(var i = 0; i < flippers.length; i++) {
	flippers[i].onclick = addCounter(flippers[i]);
}

function addCounter(flipper) {
	var counter = 0,
			$flipper = flipper;

	return function() {
		counter = counter ? 0 : 1;
		if(counter) 
			$flipper.classList.add("flip");
		else
			$flipper.classList.remove("flip");
	}
}
