var dictionary;

var generateText = function() {
	var length = document.getElementById('length').value || 1,
			rightStart = document.getElementById('check').checked;
	document.getElementById('text').innerHTML = generateStr(dictionary, length, rightStart);
}

var generateDict = function() {
	var str = document.getElementById('str').value;
	dictionary = createDict(str);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
