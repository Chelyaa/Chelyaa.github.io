var fs = require('fs'),
		generator = require('./generator-module.js');

var argv = process.argv;

if(argv.length > 2) {
	switch(argv[2]) {
		case '-gd':
			if(!argv[3]) {
				console.log("Correct format, dude: -gd <file>");
			} else {
				var text = generator.prepareText(fs.readFileSync(argv[3])+'');
				console.log("Number of words in text: " + text.length);
				console.log("Just wait, dude...");

				var start = Date.now();
				var dict = generator.generateDict(text, generator.getDict());
				console.log("Okay, that's all. It's took " + (Date.now() - start) + "ms, dude");
				console.log("New words in dictionary: " + dict.newWords);
				console.log("Total: " + dict.totalWords);
				console.log("Save dictionary...");
				generator.saveDict(dict.dictionary);
			}
			break;
		case '-gt':
			var length = argv[3] ? argv[3] : 10;
			var rightStart = argv[4] ? argv[3] : false;

			console.log(generator.generateText(length, generator.getDict(), rightStart));
			break;
		case '-i':
			console.log("Words in dictionary: " + Object.keys(generator.getDict()).length);
			break;
	}
}
