var dictionary = {

}

var format = {
	"1": [getRandomNoun]
}

function decode() {
	var abbr = document.getElementById("abbr").value;
	if(isValidate(abbr)) {
		abbr = abbr.toUpperCase().split(".");
		abbr.pop();
		var len = abbr.length;

	}
}

function getRandomNoun() {
	return dictionary.nouns[random(0, dictionary.nouns.length-1)];
}

function getRandomAdjective() {
	return dictionary.adjectives[random(0, dictionary.nouns.length-1)];
}

function isValidate(str) {
	return /([А-я].)+/.test(str);
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}