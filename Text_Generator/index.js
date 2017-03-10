var dictionary;

var generateText = function() {
	var length = document.getElementById('length').value || 1,
			rightStart = document.getElementById('check').checked;
	document.getElementById('text').innerHTML = generateStr(dictionary, length, rightStart);
}

var generateDict = function() {
	var str = document.getElementById('str').value;
	dictionary = createDict(str);
	saveDict(dictionary);
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

var showInJSON = function() {
	var json = document.getElementById('json'),
			dict = {d : dictionary};

	json.innerHTML = JSON.stringify(dict);


  var range = document.createRange();  
  range.selectNode(json);  
  window.getSelection().addRange(range);  

	try {  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy email command was ' + msg);  
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  

  window.getSelection().removeAllRanges();  
}

var saveDict = function(dict) {
	var dictionary = encodeURIComponent(JSON.stringify({d : dict}));
	var req = getXmlHttp();
	req.onreadystatechange = function() { 
		console.log(req.readyState);
  	if (req.readyState == 4) {
      // statusElem.innerHTML = req.statusText; // показать статус (Not Found, ОК..)
 				if(req.status == 200) {
         	console.log("Ответ сервера: " + req.responseText);
        }
      } 
    }

	req.open('GET', 'http://text-generator.zzz.com.ua/saver.php?dict=' + dictionary, true);
	req.setRequestHeader('Access-Control-Allow-Origin', '*');
	req.send(null);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}