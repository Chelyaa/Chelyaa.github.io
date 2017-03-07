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

var showInfo = function() {
	var str = document.getElementById('str').value,
			info = document.getElementById('info-str');
	str = str.replace(/\-/g, "");
	str = str.replace(/\,/g, "");
	str = str.replace(/\.$/g, " %END%");
	str = str.replace(/\!$/g, " %END%");
	str = str.replace(/\?$/g, " %END%");
	str = str.replace(/\./g, " %END% %START%");
	str = str.replace(/\!/g, " %END% %START%");
	str = str.replace(/\?/g, " %END% %START%");
	str = str.split(" ");
	str.unshift("%START%");

	info.innerHTML = "Количество слов в тексте: " + str.length;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
