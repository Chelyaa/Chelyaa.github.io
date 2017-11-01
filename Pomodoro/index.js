var inputs = $('input[type="text"]');
inputs.forEach(function(input) {
	input.onkeydown = inputValidate;
	input.onblur = function(e) {
		if(e.srcElement.value.length == 0)
			e.srcElement.value = "0";
	}
});

function inputValidate(e) {
	e = e || event;
	
	if (e.ctrlKey || e.altKey || e.metaKey || e.code == "Backspace" || e.code == "Delete" || e.code == "ArrowLeft" || e.code == "ArrowRight") return;

	var chr = e.key;

	if(chr == null) return;

	if(chr < '0' || chr > '9') {
		return false;
	}
}

function $(selector) {
	return document.querySelectorAll(selector);
}

function changeTitle(title) {
	document.title = title;
}

$('#start').onclick = function() {
	var sc = $('#sc'),
			llb = $('#llb'),
			ls = $('#ls'),
			lsb = $('#lsb');

	startSession(sc, )
}

function startSession() {
	
}