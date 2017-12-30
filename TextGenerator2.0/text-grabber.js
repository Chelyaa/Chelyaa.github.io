const fs = require('fs'),
			http = require('http'),
			iconv = require("iconv-lite"),
			grabber = new Grabber();

function Grabber() {
	this.maxId = 1056217;
	this.currId = 1056217;
	this.url = 'http://www.e-reading.club/book.php?book=';
}

Grabber.prototype.grabBook = function() {
	if(this.currId <= this.maxId) {
		this.grabPage(this.currId, function(page) {
			page = page.split('txt');

			if(page.length > 1) {
				let url = 'http://www.e-reading.club/txt' + page[1] + 'txt';
				http.get(url, function(res) {
					let chunks = [];
					res.on("data", function(chunk) {
						chunks.push(chunk);
					});

					res.on("end", function() {
						let text = iconv.decode(Buffer.concat(chunks), "win1251").replace(/[^A-zА-я0-9]\s/g, '');

						fs.writeFileSync('text.txt', text);
						console.log("Book grabbed");
					});
				});
			}
		});

		this.currId++;
	}
};

Grabber.prototype.grabPage = function(id, callback) {
	http.get(this.url + this.currId, function(res) {
		let page = '';
		res.on("data", function(chunk) {
			page += chunk;
		});

		res.on("end", function() {
			if(page.indexOf('Ошибка 404 - страница не найдена') == -1) {
				callback(page);
			}
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

grabber.grabBook();