/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (window.location.hostname == 'tbot.xyz' && window.location.pathname == '/math/') {
	var start = function start() {
		var score = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

		answer(true);

		recurse(0, score);
		function recurse(i, n) {
			if (i >= n) return;

			solveCurrTask();

			setTimeout(function () {
				recurse(i + 1, n);
			}, duration);
		}
	};

	var solveCurrTask = function solveCurrTask() {
		var x = +document.getElementById('task_x').innerHTML,
		    op = document.getElementById('task_op').innerHTML,
		    y = +document.getElementById('task_y').innerHTML,
		    res = +document.getElementById('task_res').innerHTML;

		var trueRes = doOperation(x, op, y);
		if (trueRes === res) {
			log(x + ' ' + op + ' ' + y + ' = ' + res + '(true)');
			answer(true);
		} else {
			log(x + ' ' + op + ' ' + y + ' != ' + res + '(false, ' + trueRes + ')');
			answer(false);
		}
	};

	var doOperation = function doOperation(x, op, y) {
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
	};

	var answer = function answer(isCorrect) {
		var buttons = {
			correct: document.getElementById('button_correct'),
			wrong: document.getElementById('button_wrong')
		};

		if (isCorrect) buttons.correct.click();else buttons.wrong.click();
	};

	var addControls = function addControls() {
		var controls = document.createElement('iframe');

		document.body.insertBefore(controls, document.getElementById('page_wrap'));
		controls.style.marginTop = '40px';
		controls.width = '400';
		controls.height = '55';
		controls.align = 'left';
		controls.style.border = 'none';

		var doc = controls.contentWindow.document;
		var scoreInput = doc.createElement('input');
		doc.body.appendChild(scoreInput);
		scoreInput.className = 'score-input';
		scoreInput.placeholder = 'Score';

		var durationInput = doc.createElement('input');
		doc.body.appendChild(durationInput);
		durationInput.className = 'duration-input';
		durationInput.placeholder = 'Duration';

		var button = doc.createElement('button');
		doc.body.appendChild(button);
		button.className = 'start-game';
		button.innerHTML = 'Start';

		button.addEventListener('click', function () {
			var score = +scoreInput.value,
			    duration = +durationInput.value;

			start(score, duration);
		});

		var style = doc.createElement('style');
		doc.head.appendChild(style);
		style.innerHTML = '\n\t\t\tinput {\n\t\t\t\tfont-size: 20px;\n\t\t\t\tfont-family: monospace;\n\t\t\t\twidth: 120px;\n\t\t\t\tpadding: 5px;\n\t\t\t\tmargin: 0 5px;\n\t\t\t\tcolor: #333333;\n\t\t\t\tborder: 2px solid #333333;\n\t\t\t}\n\n\t\t\tinput:focus {\n\t\t\t\toutline: none;\n\t\t\t}\n\n\t\t\tbutton {\n\t\t\t\tfont-size: 20px;\n\t\t\t\tpadding: 5px;\n\t\t\t\tcolor: #333333;\n\t\t\t\tborder: 2px solid #333333;\n\t\t\t\tbackground: white;\n\t\t\t}\n\n\t\t\tbutton:hover {\n\t\t\t\tcursor: pointer;\n\t\t\t\tbackground-color: #333333;\n\t\t\t\tcolor: white;\n\t\t\t}\n\t\t';
	};

	var log = function log(msg) {
		console.log(msg);
	};

	document.addEventListener("keyup", function (e) {
		var code = e.keyCode || e.charCode;
		if (code == 83 && e.altKey) {
			start();
		}
	});

	window.onload = addControls;
}

/***/ })
/******/ ]);