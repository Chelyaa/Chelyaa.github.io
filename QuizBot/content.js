var answers,
		xhr = new XMLHttpRequest();
xhr.open("GET", "https://castlequizsolver.000webhostapp.com/answers.json", true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			answers = JSON.parse(xhr.responseText);
			console.log(answers);
		}
	}
};
xhr.send();

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
})();

function getSolve() {
	console.log("Start find the answer...");
	// var popup = chrome.notifications.create({
	//   type: "basic",
	//   title: 'Start find the answer...',
	//   message: 'Wait a second',
	//   iconUrl: "128.png"
	// });
 //  popup.show();
	var question = document.getElementsByClassName("b-modal-content__title")[0].innerHTML,
			answersBlock = document.getElementsByClassName("b-modal-content__answers")[0];
	if(question in answers) {
		console.log("The answer: \n" + answers[question]);
		// var popup = chrome.notifications.create({
		//   type: "basic",
		//   title: 'I know the answer',
		//   message: answers[question],
		//   iconUrl: "128.png"
		// });
  //   popup.show();

		var answer = answers[question];
		for(var i = 0; i < answersBlock.childNodes; i++) {
			if(answersBlock.childNodes[i].innerHTML == answer)
				answersBlock.childNodes[i].click();
		}
	} else {
		console.log("I dont know the answer");
		// var popup = chrome.notifications.create({
		//   type: "basic",
		//   title: 'I don\'t know the answer',
		//   message: 'But I can save it',
		//   iconUrl: "128.png"
		// });
  //   popup.show();
		xhr.open("GET", "https://castlequizsolver.000webhostapp.com/solver.php?question=" + encodeURIComponent(question), true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					answers = JSON.parse(xhr.responseText);
					console.log(answers);
				}
			}
		}
		xhr.send();
	}
}
