var createDict = function(str) {
	var dictionary = {};
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

	var start = Date.now();
	for(var i = 0, c = 0; i < str.length; i++) {
		var cstr = str[i];
		cstr.toLowerCase();

		if(!(cstr in dictionary)) {
			dictionary[cstr] = {};
			if(str[i+1] !== undefined) {
				if(str[i+1] in dictionary[cstr]) {
					dictionary[cstr][str[i+1]]++;
				} else {
					dictionary[cstr][str[i+1]] = 1;
				}
			}
			c++;
		} else {
			if(str[i+1] !== undefined) {
				if(str[i+1] in dictionary[cstr]) {
					dictionary[cstr][str[i+1]]++;
				} else {
					dictionary[cstr][str[i+1]] = 1;
				}
			}
		}
	}

	document.getElementById("info-dict").innerHTML = "Количество слов в словаре: " + Object.keys(dictionary).length + "\n Время исполнения: " + (Date.now() - start) + " мс";
	return dictionary;
}

var generateStr = function(dict, length, rightStart = 1) {
	var str;
	if(rightStart) {
		str = ["%START%"];
	} else {
		var firstIndex = random(0, Object.keys(dictionary).length-1), 
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
	// for(var i = 0; i < length; i++) {
	// 	for(var j = 0; j < dict.length; j++) {
	// 		if(dict[j][0] === w) {
	// 			var o = dict[j][1],
	// 			n = 0,
	// 			p = [],
	// 			r = Math.random();
	// 			for(var key in o) {
	// 				n += o[key];
	// 			}
	// 			for(var key in o) {
	// 				p.push([o[key]/n, key]);
	// 			}
				
	// 			for(var a = 0; a < p.length; a++) {
	// 				r -= p[a][0];
	// 				if(r < 0) {
	// 					str.push(p[a][1]);
	// 					break;
	// 				}
	// 			}
	// 		}
	// 	}
		w = str[i+1];
	}

	str = str.toString();
	str = str.replace(/\,/g, " ");
	str = str.replace(/%START%/g, "");
	str = str.replace(/%END%/g, ".");

	return str;
}

var writeDict = function() {
	var table = document.createElement('table'), tr, td, th;
	table.className = "table table-bordered table-condensed";
	document.getElementById("dict-table").appendChild(table);
	var thead = document.createElement('thead'),
	tbody = document.createElement('tbody');
	table.appendChild(thead);
	table.appendChild(tbody);
	tr = document.createElement('tr');
	thead.appendChild(tr);

	th = document.createElement('th');
	th.innerHTML = "Данное слово";
	tr.appendChild(th);

	th = document.createElement('th');
	th.innerHTML = "Слово, которое встречается после данного слова(слово: количество появлений)";
	tr.appendChild(th);
	for(word in dictionary) {
		tr = document.createElement('tr');
		tbody.appendChild(tr);
		td = document.createElement('td');
		tr.appendChild(td);
		td.innerHTML = word;
		td = document.createElement('td');
		tr.appendChild(td);
		for(var key in dictionary[word]) {
			td.innerHTML += key + ": " + dictionary[word][key] + "; ";
		}
	}
}

		// for(var j = 0; j < str.length; j++) {
		// 		if(str[j] === cstr) {
		// 			if(str[j+1] !== undefined) {
		// 				if(str[j+1] in dictionary[c][1]) {
		// 					dictionary[c][1][str[j+1]]++;
		// 				} else {
		// 					dictionary[c][1][str[j+1]] = 1;
		// 				}
		// 			}
		// 		}
		// 	}