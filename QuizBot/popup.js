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

//b-modal-content__info b-modal-content
//i-control g-modal g-modal_adventure g-modal_transparent g-modal_vertical g-modal_medium g-modal_no-scroll g-modal_hidden
//b-hexagon-map
//b-battle-cell_enemy-owned
//b-battle-cell_user-owned
/*
		0_1
1_0			0_2
		1_1
 2_0		1_2
 		2_1
 3_0		2_2
 		3_1
4_0			3_2