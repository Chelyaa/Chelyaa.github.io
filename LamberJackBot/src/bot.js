document.addEventListener("keyup", function(e) {
	const code = e.keyCode || e.charCode;
	if (code == 83 && e.altKey) {
		start();
	} else if (code == 65 && e.altKey) {
		step();
	}
});

let shareDataEl = document.createElement('div');
document.body.appendChild(shareDataEl);
shareDataEl.id = 'share-data';
shareDataEl.style.display = 'none';

let oldScript = document.querySelector('script[src="js/main.min.js?27"]');
document.body.removeChild(oldScript);

let pageWrap = document.getElementById('page_wrap').cloneNode(true);
document.body.removeChild( document.getElementById('page_wrap') );
document.body.insertBefore(pageWrap, document.getElementById('share-data'));

document.querySelector('#canvas_wrap').removeChild( document.querySelectorAll('#canvas_wrap > canvas')[0] );
	
let newScript = document.createElement('script');
newScript.src = 'https://rawcdn.githack.com/Chelyaa/Chelyaa.github.io/master/scripts/main-bot.min.js';
document.body.appendChild(newScript);

function start() {
  click('left');
  recurse(0, 1000);

  function recurse(i, n) {
  	if (i >= n) return;

  	step();
  	setTimeout(function() {
	  	recurse(i+1, n);
  	}, 100);
  }
}

function step() {
	let data = +shareDataEl.innerHTML;

	if (data == 0 || data > 0) click('left');
	else click('right');

	data = +shareDataEl.innerHTML;

	if (data == 0 || data > 0) click('left');
	else click('right');
}

function click(title) {
	const buttons = {
		left: document.getElementById('button_left'),
		right: document.getElementById('button_right')
	};

	console.log(title);
	buttons[title].click();
}