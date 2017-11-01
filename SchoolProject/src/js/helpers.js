function showModal(id) {
	$('#' + id).show();
}

function hideModal(id) {
	$('#' + id).hide();
	$('#' + id)[0].dataset = undefined;
}

function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp);
  let year = a.getUTCFullYear();
  let month = a.getUTCMonth();
  let date = a.getUTCDate();
  let time = date + '/' + (month+1) + '/' + year;
  return time;
}