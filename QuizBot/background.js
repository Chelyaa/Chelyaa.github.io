var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleStateChange;
xhr.open("GET", chrome.extension.getURL('/injected.js'), true);
xhr.send();

function handleStateChange(data) {
	// var meta = document.createElement("meta");
	// meta.setAttribute("http-equiv", "Content-Security-Policy");
	// meta.setAttribute("content", "default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clevver.me");
	// document.getElementsByTagName("head")[0].appendChild(meta);
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.innerHTML = data;
	document.getElementsByTagName("head")[0].appendChild(script);
	document.getElementsByTagName("body")[0].setAttribute("onLoad", "ai_on();");
}

//<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://platform.linkedin.com ">