const fs = require('fs');

const dataWorker = {

	save: data => {
		return new Promise(res => {
	    fs.writeFile('documents/products-ru.json', JSON.stringify(data), err => { if (err) throw err; res(); });
		});
	},

	read: () => {
		return new Promise(res => {
     	fs.readFile('documents/products-ru.json', (err, data) => { res( JSON.parse(''+data) ) });
    });
	}

}

module.exports = dataWorker;

