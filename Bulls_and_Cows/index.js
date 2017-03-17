var number = 0;
function startGame() {
	document.getElementsByClassName("start-panel")[0].style.display = "none";
	document.getElementsByClassName("game-panel")[0].style.display = "block";

	number = generateNumber();
}

function sendVar() {
	var n = document.getElementById("input").value,
			cows = 0,
			bulls = 0,
			res = '';

	for(var i = 0; i < 4; i++) {
		if(n[i] == number[i]) {
			bulls++;
		} else {
			for(var j = 0; j < 4; j++) {
				if(n[i] == number[j]) {
					cows++;
				}
			}
		}
	}
	if(bulls == 4) {
		alert("You guessed: " + number);
		window.location.reload();
	} else {
		res = n + ": bulls - " + bulls + " cows - " + cows;
		writeResponse(res);
	}
}

function writeResponse(str) {
	var ul = document.getElementById('game-list'),
			li = document.createElement('li');

	li.innerHTML = str;
	ul.appendChild(li);
}

function generateNumber() {
	var number = "", n = 0, flag = true;;
	for(var i = 0; i < 4; i++) {
		n = r(number);
		number += n;
	}

	return number;
}

function r(number) {
	var n = random(0, 9);
	for(var i = 0; i < number.length; i++) {
		if(n == number[i])
			return r(number);
	}
	return n;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}