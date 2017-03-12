$.ajax({
  type: "POST",
  url: "face-bot.000webhostapp.com/",
  data: { name: "John", location: "Boston" }
}).done(function( msg ) {
  alert( "Data Saved: " + msg );
});