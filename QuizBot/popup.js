function sendMsg(data, res) {
	data.from = "popup";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, data, res);
	});
}
document.getElementById("butt").addEventListener("click", function() {
	sendMsg({txt: "Hello"}, function(r) {

	});
});
//b-modal-content__answers - answers block
//b-modal-content__title - title
//b-modal-content__answer b-modal-content__answer_highlighted b-modal-content__answer_right
//
//b-page__flag-wrap - leave the game
//b-modal-content__new-game-button - to castle