var blocksEl = [
	document.getElementsByClassName("red")[0],
	document.getElementsByClassName("green")[0],
	document.getElementsByClassName("blue")[0],
	document.getElementsByClassName("yellow")[0],
];

// blocksEl[0].onclick = function() {
// 	click(0);
// }
// blocksEl[1].onclick = function() {
// 	click(1);
// }
// blocksEl[2].onclick = function() {
// 	click(2);
// }
// blocksEl[3].onclick = function() {
// 	click(3);
// }

for(var i = 0; i < blocksEl.length; i++) {
	blocksEl[i].onclick = createHandler(i);
}

var lvls = [
	[0],
	[0, 1],
	[0, 1, 0],
	[0, 1, 0, 2],
	[0, 1, 2, 1],
];

var currNumLvl = 0,
		isInput = false,
		input = [],
		score = 0;

window.onload = function() {
	showLvl(currNumLvl, lvls.length);
	showScore(score);
	setTimeout(function() {
		start(0);
	}, 3000);	
}

function start(currNumLvl) {
	var currLvl = lvls[currNumLvl];
	renderLvl(currLvl);
}

function click(n) {
	input.push(n);
	for(var i = 0; i < input.length; i++) {
		if(input[i] != lvls[currNumLvl][i]) {
			isInput = false;
			input = [];
			score = score - 10 > 0 ? score - 10 : 0;
			setTimeout(function() {
				showScore(score);
				start(currNumLvl);
			}, 1000);
			return;
		}
	}

	if(input.length == lvls[currNumLvl].length) {
		currNumLvl++;
		if(currNumLvl < lvls.length) {
			isInput = false;
			input = [];
			setTimeout(function() {
				score += 100;
				showLvl(currNumLvl, lvls.length);
				showScore(score);
				start(currNumLvl);
			}, 1000);
		} else {
			alert("You win\nYour score: " + score);
			window.location.reload();
		}
	}
}

function renderLvl(lvl) {
	(function recurse(n) {
		if(n < lvl.length) {
			blocksEl[lvl[n]].classList.add("opacity");
			setTimeout(function() {
				blocksEl[lvl[n]].classList.remove("opacity");
				setTimeout(function() {
					n++;
					recurse(n);
				}, 900);
			}, 1000);
		} else {
			isInput = true;
			return;
		}
	})(0)
}

function showLvl(currNumLvl, numLvl) {
	document.getElementById("lvl").innerHTML = currNumLvl+1 + "/" + numLvl;
}
function showScore(score) {
	document.getElementById("score").innerHTML = "Score: " + score;
}

function createHandler(i) {
	return function() {
		if(isInput) {
			isInput = false;
			blocksEl[i].classList.add("opacity");
			setTimeout(function() {
				blocksEl[i].classList.remove("opacity");
				isInput = true;
				click(i);
			}, 1000);
		}
	}
}
