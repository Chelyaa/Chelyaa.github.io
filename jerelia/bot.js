const grabber = require('./modules/grabber'),
			dataWorker = require('./modules/data.js'),
			fs = require('fs'),
			sheets = require('./modules/GoogleSheets/sheets');

// recurse();
// function recurse() {
// 	grabber.grabNextGroup()
// 	.then(() => {
// 		recurse();
// 	});
// }

fs.readFile('documents/groups-links-ru.txt', (err, data) => {
	if (err) throw err;
	const structure = JSON.parse(data);

	recurse(131, structure.length);
	function recurse(i, n) {
		if (i >= n) return;

		sheets.addGroup({
			title: structure[i].title,
			parent: structure[i].parent
		}).then(title => {
			console.log(i + '(' + n + ').' + title + ' added');
			recurse(i+1, n);
		});
	}
});

// dataWorker.read()
// .then(data => {

// 	const articuls = Object.keys(data);

// 	recurse(0, articuls.length);
// 	function recurse(i, n) {
// 		if (i >= n) return;

// 		sheets.addProduct(data[articuls[i]])
// 		.then(() => {
// 			console.log(i + '/' + n + '. ' + articuls[i] + ' added');
// 			recurse(i+1, n);
// 		});
// 	}

// });

function removeTag(tag, str) {
  var reg = new RegExp('<' + tag + '.*?>', 'g', 'i', 's');
  str = str.replace(reg, '');

  var reg = new RegExp('</' + tag + '.*?>', 'g', 'i', 's');
  str = str.replace(reg, '');
  return str;
}