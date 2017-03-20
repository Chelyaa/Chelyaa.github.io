var currChapter = 0;

showBlocks("first--1");
function goTo() {
	ids = this.className.split(" ");
	var pageNext = document.getElementById(ids[1]),
			pageCurr = document.getElementById(ids[0]),
			field = document.getElementById("field");

	field.childNodes[1].classList.remove('active');
	field.childNodes[1].classList.add('passive-opacity');

	setTimeout(function() {
		showBlocks(ids[1]);
	}, 300);
}

function showBlocks(elId) {
	var field = document.getElementById("field"),
			page = document.getElementById(elId),
			content = parse(page),
			blocks,
			text;

	if(elId.split("--")[1] != currChapter) {
		blocks = render(content, true);
		currChapter = elId.split("--")[1];
		document.getElementById("chapter").innerHTML = currChapter;
	} else {
		blocks = render(content, false);
	}

	text = field.childNodes[0];
	var i = 0, timer = setInterval(function() {
		if(i >= blocks.length) {
			field.childNodes[1].classList.remove('passive-opacity');
			field.childNodes[1].classList.add('active');
			i = 0;
			clearInterval(timer);
		} else {
			text.appendChild(blocks[i]);
			blocks[i].classList.remove('passive-opacity');
			blocks[i].classList.add('active');
			field.childNodes[0].scrollTop = field.childNodes[0].scrollHeight;
			i++;
		}
	}, 1500);
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

function parse(el) {
	var childs = el.childNodes,
	content = {text: [], links: []};
	for(var i = 0; i < childs.length; i++) {
		if(issetClass(childs[i], "text")) {
			for(var j = 0; j < childs[i].childNodes.length; j++) {
				if(childs[i].childNodes[j].nodeName === "SPAN") {
					var span = childs[i].childNodes[j];
					if(issetClass(span, "ch")) {
						content.text.push(["ch", span.innerHTML]);
					} else {
						content.text.push(["au", span.innerHTML]);
					}
				}
			}
		} else if(issetClass(childs[i], "links")) {
			for(var j = 0; j < childs[i].childNodes.length; j++) {
				if(childs[i].childNodes[j].nodeName === "BUTTON") {
					var link = childs[i].childNodes[j];
					content.links.push([link.className, link.innerHTML]);
				}
			}
		}
	}

	return content;
}

function render(content, isUpdate) {
	var field = document.getElementById("field"),
			spans = [];

	if(!field.childNodes.length) {
		text = document.createElement("div");
		links = document.createElement("div");

		text.className = "text";
		links.className = "links passive-opacity";
		field.appendChild(text);
		field.appendChild(links);
	} else {
		text = field.childNodes[0];
		links = field.childNodes[1];
		links.innerHTML = "";
		if(isUpdate) {
			text.innerHTML = "";
		}
	}

	var span;
	for(var i = 0; i < content.text.length; i++) {
		span = document.createElement("span");
		span.className = content.text[i][0] === "ch" ? "ch passive-opacity" : "au passive-opacity";
		span.innerHTML = content.text[i][1];
		spans.push(span);
	}

	var link;
	for(var i = 0; i < content.links.length; i++) {
		butt = document.createElement("button");
		butt.innerHTML = content.links[i][1];
		butt.className = content.links[i][0];
		butt.onclick = goTo;
		links.appendChild(butt);
	}

	return spans;
}

function issetClass(el, className) {
	if(el.classList) {
		for(var i = 0; i < el.classList.length; i++) {
			if(el.classList[i] === className) 
				return true;
		}
	}

	return false;
}