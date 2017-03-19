showBlocks("first");
function goTo(pageNextId, pageCurrId) {
	var pageNext = document.getElementById(pageNextId),
			pageCurr = document.getElementById(pageCurrId);
			
	pageNext.classList.remove('passive-display');
	pageNext.classList.add('active');
	pageCurr.classList.remove('active');
	pageCurr.classList.add('passive-display');

	showBlocks(pageNextId);
}

function showBlocks(elId) {
	var page = document.getElementById(elId),
			blocks = page.childNodes[1].childNodes;

	var i = 0, timer = setInterval(function() {
		if(i >= blocks.length) {
			showLinks(page, elId);
			clearInterval(timer);
		} else {
			if(blocks[i].nodeName == "SPAN" && issetClass(blocks[i], elId)) {
				blocks[i].classList.remove('passive-opacity');
				blocks[i].classList.add('active');
				page.childNodes[1].scrollTop = page.childNodes[1].scrollHeight;
			}
			i++;
		}
	}, 100);
}

function showLinks(page, id) {
	var links = page.childNodes[3].childNodes;
	for(var i = 0; i < links.length; i++) {
		if(links[i].nodeName === "BUTTON" && issetClass(links[i], id+"-link")) {
			links[i].classList.remove('passive-opacity');
			links[i].classList.add('active');
		}
	}
}

function issetClass(el, className) {
	for(var i = 0; i < el.classList.length; i++) {
		if(el.classList[i] === className) 
			return true;
	}

	return false;
}