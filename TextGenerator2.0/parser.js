var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

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

var t = Date.now();
function getRandomBook() {
	console.log("Start");
	var genre = random(0, 19);

	console.log('\n');
	console.log('Genre: ' + genresLinks[genre]);
	page.open(genresLinks[genre])
		.then(function(status){
			if(status == "success") {
				console.log("Success");
				var links = page.evaluate(function() {
					return document.querySelectorAll('.wrapper > .content > ul > li > a');
				});

				var subgenre = random(0, links.length);
				console.log("Subgenre: " + links[subgenre].href);
				page.open(links[subgenre].href)
					.then(function(status) { 
						if(status == "success") {
							var books = page.evaluate(function() {
								var a = document.querySelectorAll('.wrapper > .content > a');
								return a;
							});
							console.log(books.join('\n'));
							var book = books[random(0, books.length)];
							console.log("Book: " + [book].innerText);
							book = book.href.split('/');
							book[1] = 'read';
							book = books.join('/');
							page.open(books)
								.then(function() {
									if(status == "success") {

									}
								});
						} else {
							console.log(status);
						}
					});
			}	else {
				console.log("Sorry, the page is not loaded");
			}
		});
}
getRandomBook();

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
//22