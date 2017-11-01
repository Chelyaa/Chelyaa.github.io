var fs = require('fs');

var Generator = {

	generateText: function(length, dict, rightStart) {
		var str;
		if(rightStart) {
			str = ["%START%"];
		} else {
			var firstIndex = this.random(0, Object.keys(dict).length-1), 
			i = 0;
			for(word in dict) {
				if(i == firstIndex) {
					str = [word];
					break;
				}
				i++;
			}
		}
		var w = str[0];
		for(var i = 0; i < length; i++) {
			var o = dict[w],
			n = 0,
			p = [],
			r = Math.random();
			for(var key in o) {
				n += o[key];
			}
			for(var key in o) {
				p.push([o[key]/n, key]);
			}

			for(var a = 0; a < p.length; a++) {
				r -= p[a][0];
				if(r < 0) {
					str.push(p[a][1]);
					break;
				}
			}
			w = str[i+1];
		}

		str = str.toString();
		str = str.replace(/\,/g, " ");
		str = str.replace(/%START%/g, "");
		str = str.replace(/%END%/g, ".");

		return str;
	},
	prepareText: function(str) {
		str = str.replace(/\-/g, "")
		.replace(/\,/g, "")
		.replace(/\.$/g, " %END%")
		.replace(/\!$/g, " %END%")
		.replace(/\?$/g, " %END%")
		.replace(/\./g, " %END% %START%")
		.replace(/\!/g, " %END% %START%")
		.replace(/\?/g, " %END% %START%");

		str.toLowerCase();
		str = str.split(" ");
		str.unshift("%START%");

		return str;
	},
	generateDict: function(str, dict) {
		if(!dict)
			dict = {};

		var newWords = 0;
		for(var i = 0, c = 0; i < str.length; i++) {
			var cstr = str[i];

			if(!(cstr in dict)) {
				dict[cstr] = {};
				if(str[i+1] !== undefined) {
					if(str[i+1] in dict[cstr]) {
						dict[cstr][str[i+1]]++;
					} else {
						dict[cstr][str[i+1]] = 1;
					}
				}
				c++;
				newWords++;
			} else {
				if(str[i+1] !== undefined) {
					if(str[i+1] in dict[cstr]) {
						dict[cstr][str[i+1]]++;
					} else {
						dict[cstr][str[i+1]] = 1;
					}
				}
			}
		}

		return {dictionary: dict, newWords: newWords, totalWords: Object.keys(dict).length};
	},
	saveDict: function(dict) {
		fs.writeFileSync('dictionary.json', JSON.stringify(dict));
	},
	getDict: function() {
		return JSON.parse(fs.readFileSync('dictionary.json')+'');
	},
	random: function(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
}

module.exports = Generator;