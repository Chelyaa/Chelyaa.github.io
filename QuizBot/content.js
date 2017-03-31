var answers, xhr = new XMLHttpRequest();
getAnswers();

var history = [],
		s = 1,
		strategy = ["3_1", "2_2", "3_0", "3_2", "4_0"],
		stepOfStrategy = 0;

chrome.runtime.sendMessage({
	from:    'content',
	subject: 'showPageAction'
});

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
		}
	});

	setInterval(function() {
		var titleEL = document.getElementsByClassName("b-modal-content__info")[0],
				modal = document.getElementsByClassName("g-modal_hidden")[0];
		if(titleEL != undefined) {
			if(titleEL.innerHTML == "Вопрос-дуель" && s == 1) {
				getSolve();
				s = 0;
			} else if(titleEL.innerHTML == "Вопрос соперника" && modal != undefined && s == 1) {
				step();
				s = 0;
			} else if((titleEL.innerHTML == "Ваш вопрос" || titleEL.innerHTML == "Вопрос-дуель") && modal != undefined && s == 0) {
				s = 1;
			}
		}
	}, 100);
})();

function step() {
	setTimeout(function() {
		console.log("My step");
		var map = document.getElementsByClassName("b-hexagon-map")[0],
				currStep = strategy[stepOfStrategy].split("_");

		console.log(map.childNodes);
		console.log(map.childNodes[currStep[0]]);
		console.log(map.childNodes[currStep[1]]);
		console.log(map.childNodes[currStep[0]].childNodes[currStep[1]]);
		map.childNodes[currStep[0]].childNodes[currStep[1]].click();
		stepOfStrategy++;
		setTimeout(function() {
			getSolve();
		}, 4000);
	}, 15000);
}

function getSolve() {
	// console.log(document.getElementsByClassName("b-hexagon-map"));
	var title = document.getElementsByClassName("b-modal-content__info")[0].innerHTML,
			waittingTime = 3000;

	var question = document.getElementsByClassName("b-modal-content__title")[0].innerHTML,
			answersBlock = document.getElementsByClassName("b-modal-content__answers")[0];
	if(question in answers) {
		var answer = answers[question];
		console.log("The answer: \n" + answer);
		for(var i = 0; i < answersBlock.childNodes.length; i++) {
			if(answersBlock.childNodes[i].innerHTML == answer)
				answersBlock.childNodes[i].click();
		}
	} else {
		console.log("I dont know the answer");
		var answersBlock = document.getElementsByClassName("b-modal-content__answer");
		// console.log(answersBlock);
		answersBlock[random(0, 4)].click();

		if(title == "Ваш вопрос") {
			setTimeout(function() {
				var rightAnswer = document.getElementsByClassName("b-modal-content__answer_right")[0].innerHTML;
				console.log("I find the answer: " + rightAnswer);
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