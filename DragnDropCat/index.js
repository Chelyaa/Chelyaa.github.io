var imgSrc = ["imgs/1.jpg",
							"imgs/2.jpg",
							"imgs/3.jpg",
							"imgs/4.jpg",
							"imgs/5.jpg",
							"imgs/6.jpg",
							"imgs/7.jpg",
							"imgs/8.jpg",
							"imgs/9.jpg",
							"imgs/10.jpg"];
preLoad(imgSrc);

var	body = document.getElementById("body"),
counter = 0;

var title = "There are " + imgSrc.length + " different cats";
document.getElementById("title").innerHTML = title;

document.onmousedown = function(e) {
	e.preventDefault();
}

document.onclick = function(e) {
	var img = document.createElement('img');
	img.src = imgSrc[random(0, imgSrc.length)];
	img.style.width = "100px";
	img.style.left = e.clientX-50 + "px";
	img.style.top = e.clientY-50 + "px";
	img.id = counter;
	body.appendChild(img);

	counter++;

	img.onmousedown = function(e) {

		var coords = getCoords(img);
		var shiftX = e.pageX - coords.left;
		var shiftY = e.pageY - coords.top;

		img.style.position = 'absolute';
		document.body.appendChild(img);
		moveAt(e);

	  img.style.zIndex = 1000; // над другими элементами

	  function moveAt(e) {
	  	img.style.left = e.pageX - shiftX + 'px';
	  	img.style.top = e.pageY - shiftY + 'px';
	  }

	  document.onmousemove = function(e) {
	  	moveAt(e);
	  };

	  img.onmouseup = function() {
	  	document.onmousemove = null;
	  	img.onmouseup = null;
	  };

	}
	img.ondragstart = function() {
		return false;
	};
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function getCoords(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem)
	} else {
		return getOffsetSum(elem)
	}
}

function getOffsetSum(elem) {
	var top=0, left=0
	while(elem) {
		top = top + parseInt(elem.offsetTop)
		left = left + parseInt(elem.offsetLeft)
		elem = elem.offsetParent
	}

	return {top: top, left: left}
}

function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect()
	var body = document.body
	var docElem = document.documentElement
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
	var clientTop = docElem.clientTop || body.clientTop || 0
	var clientLeft = docElem.clientLeft || body.clientLeft || 0
	var top  = box.top +  scrollTop - clientTop
	var left = box.left + scrollLeft - clientLeft

	return { top: Math.round(top), left: Math.round(left) }
}

function preLoad(urls) {
	var img;
	for(var i = 0; i < urls.length; i++) {
		img = document.createElement('img');
		img.src = urls[i];
	}
}