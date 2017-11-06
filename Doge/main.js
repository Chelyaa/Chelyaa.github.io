window.addEventListener('load', function () {
	var src = document.getElementById("images").getElementsByTagName("img"),
	img = function img (el,x,y) {
		var d = document.createElement("div");
		d.className     = "frame";
		d.style.left    = 50 * x + "%";
		d.style.top     = 50 * y + "%";
		var img         = document.createElement("img");
		img.className   = "img";
		img.src         = src[Math.floor(Math.random()*src.length)].src;
		img.addEventListener('click', function () {
			div(this.parentNode);
			this.parentNode.removeChild(this);
		});
		d.appendChild(img);
		el.appendChild(d);
	},
	div = function div (el) {
		img(el,0,0);
		img(el,1,0);
		img(el,0,1);
		img(el,1,1);
	};
	div(document.getElementById("screen"));
	window.ondragstart = function() { return false; } 

	recurse(1);
}, false);

function recurse(depth) {
	var selector = '#screen >';
	for(var i = 0; i < depth; i++) {
		selector += ' .frame >';
	}

	selector += ' img';

	var imgs = document.querySelectorAll(selector);
	if(imgs.length > 0) {
		imgs[random(0, imgs.length)].click();
		setTimeout(function() {
			recurse(depth);
		}, 1);
	} else {
		setTimeout(function() {
			recurse(depth+1);
		}, 1);
	}
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}