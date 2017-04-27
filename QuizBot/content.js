chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});

var answers, xhr = new XMLHttpRequest();
getAnswers();

var history = [],
		s = 1,
		strategy = ["3_1", "2_2", "3_0", "3_2", "4_0", "2_1", "2_0", "1_2", "1_1", "1_0", "0_2", "0_1"],
		stepOfStrategy = 0,
		timer,
		duelTimer,
		isMyStep = false,
		isDuel = false,
		isStartDuel = false,
		isVictory = false,
		isDefeat = false,
		isEndDraw = false,
		isDraw = false,
		drawNum = 0;

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
	if (msg.from === 'popup') {
		response(msg);
	}
});
(function() {
	console.log(window.location.hostname);

	document.addEventListener("keyup", function(e) {
		var code = e.keyCode || e.charCode;
		if(code == 83 && e.altKey) {
			getSolve();
		} else if(code == 65 && e.altKey) {
			start();
		} else if(code == 90 && e.altKey) {
			stop();
		}
	});
})();

function start() {
	console.log("Start");
	var oldQuestion;
	timer = setInterval(function() {
		var titleEL = document.getElementsByClassName("b-modal-content__info")[0],
				modal = document.getElementsByClassName("g-modal_hidden")[0];
		if(modal == undefined) {
			console.log(modal);
			console.log(titleEL.innerHTML);
		}
	}, 100);
}

function stop() {
	console.log("Stop");
	clearInterval(timer);
	stepOfStrategy = 0;
	s = 1;
}

function step() {
	isMyStep = true;
	console.log("My step: " + stepOfStrategy);
	var map = document.getElementsByClassName("b-hexagon-map")[0],
	currStep = strategy[stepOfStrategy].split("_");

	var block = map.childNodes[currStep[0]].childNodes[currStep[1]];
	if(block.className == "b-hexagon-map__node")
		block = block.childNodes[0];

	for(var i = 0; i < block.childNodes.length; i++) {
		if(block.childNodes[i].className == "b-battle-cell__tap-zone")
			block.childNodes[i].click();
	}

	setTimeout(function() {
		getSolve();
	}, 5000);
}

function getSolve() {
	var title = document.getElementsByClassName("b-modal-content__info")[0].innerHTML,
			waittingTime = 4000;

	var question = document.getElementsByClassName("b-modal-content__title")[0].innerHTML,
			answersBlock = document.getElementsByClassName("b-modal-content__answers")[0];
	console.log("Question: " + question);

	if(question in answers) {
		if(!isDuel)
			stepOfStrategy++;

		var answer = answers[question];
		console.log("The answer: " + answer);
		for(var i = 0; i < answersBlock.childNodes.length; i++) {
			if(answersBlock.childNodes[i].innerHTML == answer)
				answersBlock.childNodes[i].click();
		}
	} else {
		console.log("I dont know the answer");
		var answersBlock = document.getElementsByClassName("b-modal-content__answer");
		
		var randIndex = random(0, 4);
		answersBlock[randIndex].click();

		if(title == "Ваш вопрос") {
			setTimeout(function() {
				var rightAnswer = document.getElementsByClassName("b-modal-content__answer_right")[0].innerHTML;
				console.log("I find the answer: " + rightAnswer);

				for(var i = 0; i < answersBlock.length; i++) {
					if(answersBlock[i].classList.contains('b-modal-content__answer_right') && randIndex == i)
				  	stepOfStrategy++;
				}

				xhr.open("GET", "https://castlequizsolver.000webhostapp.com/solver.php?question=" + encodeURIComponent(question) + "&answer=" + encodeURIComponent(rightAnswer), true);
				xhr.onreadystatechange = function() {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							console.log("I save the answer");
							answers[question] = rightAnswer;
							// console.log(answers);
						}
					}
				}
				xhr.send();
			}, waittingTime);
		}
	}
}

function getAnswers() {
	xhr.open("GET", "https://castlequizsolver.000webhostapp.com/answers.json", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				answers = JSON.parse(xhr.responseText);
			}
		}
	};
	xhr.send();
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}