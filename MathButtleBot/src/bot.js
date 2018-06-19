if (window.location.hostname == 'tbot.xyz' && window.location.pathname == '/math/') {

	document.addEventListener("keyup", function(e) {
		const code = e.keyCode || e.charCode;
		if(code == 83 && e.altKey) {
			start();
		}
	});

	window.onload = addControls;

	function start(score = 100, duration = 100) {
		answer(true);

		recurse(0, score);
		function recurse(i, n) {
			if (i >= n) return;

			solveCurrTask();

			setTimeout(function() {
				recurse(i+1, n);
			}, duration);
		}
	}

	function solveCurrTask() {
		const x = +document.getElementById('task_x').innerHTML,
					op = document.getElementById('task_op').innerHTML,
					y = +document.getElementById('task_y').innerHTML,
					res = +document.getElementById('task_res').innerHTML;

		let trueRes = doOperation(x, op, y);
		if (trueRes === res) {
			log(x + ' ' + op + ' ' + y + ' = ' + res + '(true)');
			answer(true);
		} else {
			log(x + ' ' + op + ' ' + y + ' != ' + res + '(false, ' + trueRes + ')');
			answer(false);
		}
	}

	function doOperation(x, op, y) {
		switch (op) {
			case '+':
				return x + y;
				break;
			case '–':
				return x - y;
				break;
			case '×':
				return x * y;
				break;
			case '/':
				return x / y;
				break;
		}
	}

	function answer(isCorrect) {
		const buttons = {
			correct: document.getElementById('button_correct'),
			wrong: document.getElementById('button_wrong')
		};

		if (isCorrect) buttons.correct.click();
		else buttons.wrong.click();
	}

	function addControls() {
		let controls = document.createElement('iframe');

		document.body.insertBefore(controls, document.getElementById('page_wrap'));
		controls.style.marginTop = '40px';
		controls.width = '400';
		controls.height = '55';
		controls.align = 'left';
		controls.style.border = 'none';

		const doc = controls.contentWindow.document;
		let scoreInput = doc.createElement('input');
		doc.body.appendChild(scoreInput);
		scoreInput.className = 'score-input';
		scoreInput.placeholder = 'Score';

		let durationInput = doc.createElement('input');
		doc.body.appendChild(durationInput);
		durationInput.className = 'duration-input';
		durationInput.placeholder = 'Duration';

		let button = doc.createElement('button');
		doc.body.appendChild(button);
		button.className = 'start-game';
		button.innerHTML = 'Start';

		button.addEventListener('click', function() {
			const score = +scoreInput.value,
						duration = +durationInput.value;

			start(score, duration);
		});

		let style = doc.createElement('style');
		doc.head.appendChild(style);
		style.innerHTML = `
			input {
				font-size: 20px;
				font-family: monospace;
				width: 120px;
				padding: 5px;
				margin: 0 5px;
				color: #333333;
				border: 2px solid #333333;
			}

			input:focus {
				outline: none;
			}

			button {
				font-size: 20px;
				padding: 5px;
				color: #333333;
				border: 2px solid #333333;
				background: white;
			}

			button:hover {
				cursor: pointer;
				background-color: #333333;
				color: white;
			}
		`;
	}

	function log(msg) {
		console.log(msg);
	}

}