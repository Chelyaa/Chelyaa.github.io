// console.log("Start");
// var page = require('webpage').create();
// var fs = require('fs');

// page.onConsoleMessage = function(msg) {
//   console.log(msg);
// }
// page.open('http://pikabu.ru', function(s) {
// 	console.log(s);
// });

// // page.open('https://www.wattpad.com/', function(s) {
// // 	if(s === 'success') {
// // 		console.log('Success');
// // 		var a = page.evaluate(function() {
// // 			return document.querySelectorAll('.discover-categories > ul > li > a');
// // 		});

// // 		var links = {};
// // 		for(key in a) {
// // 			console.log(key + " => " + a[key]);
// // 			var link = a[key];
// // 			links[link.innerText] = link.href;
// // 		}	
// // 		saveLinks(links);
// // 	} else {
// // 		console.log(s);
// // 	}
// // });

// function saveLinks(links) {
// 	fs.writeFileSync('links.json', JSON.stringify(links));
// 	console.log("Saved");
// }

console.log("Start");
var page = require('webpage').create();
var fs = require('fs');
console.log(fs);

var genresLinks = [
	'http://royallib.com/genre/voennoe_delo/',
	'http://royallib.com/genre/delovaya_literatura/',
	'http://royallib.com/genre/detektivi_i_trilleri/',
	'http://royallib.com/genre/detskoe/',
	'http://royallib.com/genre/dokumentalnaya_literatura/',
	'http://royallib.com/genre/domovodstvo_(dom_i_semya)/',
	'http://royallib.com/genre/dramaturgiya/',
	'http://royallib.com/genre/kompyuteri_i_internet/',
	'http://royallib.com/genre/lyubovnie_romani/',
	'http://royallib.com/genre/nauka_obrazovanie/',
	'http://royallib.com/genre/priklyucheniya/',
	'http://royallib.com/genre/proza/',
	'http://royallib.com/genre/prochee/',
	'http://royallib.com/genre/starinnoe/',
	'http://royallib.com/genre/tehnika/',
	'http://royallib.com/genre/fantastika/',
	'http://royallib.com/genre/folklor/',
	'http://royallib.com/genre/yumor/',
];

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

getLinks(0);
function getLinks(genre) {
	if(genre > genresLinks.length) {
		slimer.exit();
		return;
	}

	console.log('\n');
	console.log('Parsing: ' + genresLinks[genre]);
	page.open(genresLinks[genre])
			.then(function(status){
				if(status == "success") {
					console.log("Success");
					var links = page.evaluate(function() {
						return document.querySelectorAll('.wrapper > .content > ul > li > a');
					});

					var subgenre = links[random(0, links.length)].href;
					page.open(subgenre)
							.then(function() {

							});

					// var save = saveLinks(links);
					// getLinks(genre++);
				}	else {
					console.log("Sorry, the page is not loaded");
				}
			});
}

function saveLinks(l) {
	var links = JSON.parse(fs.readFileSync('links.json')+'');
	for(var i = 0; i < l.length; i++) {
		console.log(l[i].innerText + ' => ' + l[i].href);
		links[l[i].innerText] = l[i].href;
	}
	fs.writeFileSync('links.json', JSON.stringify(links));

	return 'success';
}

function random(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}