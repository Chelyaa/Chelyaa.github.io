function setimage() {
    var $input = $("#uploadimage");
    var fd = new FormData;

    fd.append('userfile', $input.prop('files')[0]);

    $.ajax({
        url: "http://face-bot.000webhostapp.com/",
        data: fd,
        ccrossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
          console.log(data);
          $('#main').append('<img src="' + data + '"/>');
        }
    });
}