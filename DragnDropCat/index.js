var imgSrc = ["https://goo.gl/qKhk1Q", 
							"https://img1.wsimg.com/fos/sales/cwh/8/images/cats-with-hats-shop-06.jpg", 
							"https://pp.userapi.com/c637524/v637524379/94af/J4gn95PVzrQ.jpg",
							"https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
							"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRYiUJ-kcvwCOqoihit1lcGLaq183DZTkaOQKsS88LW7dvW9S7f",
							"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQzSwsWkOlX2pI0bs9Zs5QoaBgHvNtB2Av8y7Ddb0_-95qnfc8-",
							"https://www.wired.com/wp-content/uploads/2014/10/cat-ft.jpg",
							"https://img1.wsimg.com/fos/sales/cwh/8/images/cats-with-hats-shop-04.jpg",
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcq7RZ3bfsjgOYGgY4meIop6UpKjYaUBv_PrTqIukuZuAh4SZVg",
							"http://r.ddmcdn.com/s_f/o_1/cx_0/cy_0/cw_300/ch_300/w_300/APL/uploads/2014/10/kitten-cuteness300.jpg"];
		body = document.getElementById("body"),
		counter = 0;

var title = "There are " + imgSrc.length + " different cats";
document.getElementById("title").innerHTML = title;

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