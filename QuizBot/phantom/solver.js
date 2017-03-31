var page = require('webpage').create();
page.clipRect = { top: 0, left: 0, width: 1366, height: 768 };
page.viewportSize = {
	width: 1366,
	height: 768
}
page.open('https://clevver.me/', function() {
	// page.render("clevver.png");
  page.evaluate(eva);
  setTimeout(function() {
		 page.render('a.png');
  }, 1000);
 
  phantom.exit()
});

page.onUrlChanged = function() {
	page.render('b.png');
}

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

function eva() {
	var loginButt = findLoginButt();
	loginButt.click();
	$c("g-input__input")[0].value = "gorshochek_s_petuniey";
	$c("g-button_no-text-transform")[0].hover();

	function findLoginButt() {
		var socialAuthEl = $c("b-page__social-auth");
		return socialAuthEl[0].lastChild;
	}

	function $i(id) {
		return document.getElementById(id);
	}
	function $c(className) {
		return document.getElementsByClassName(className);
	}
}