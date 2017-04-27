var buttPredict = $("#butt-predict");
		buttRepeatPredict = $("#butt-repeat-predict");

buttPredict.addEventListener("click", function() {
	toggleInvis(buttPredict);
	toggleInvis($(".load"));
	setTimeout(function() {
		$(".contain").classList.add("full-width"); 
		setTimeout(function() {
			toggleInvis($(".load"));
			toggleInvis($(".result"));
		}, 4000);
	}, 500);
});

buttRepeatPredict.addEventListener("click", function() {
	$(".contain").classList.remove("full-width"); 
	toggleInvis(buttPredict);
	toggleInvis($(".result"));
});

function toggleInvis(el) {
	if(el.classList.contains("invis")) 
		el.classList.remove("invis");
	else
		el.classList.add("invis");
}
function $(selector) {
	return document.querySelector(selector);
}