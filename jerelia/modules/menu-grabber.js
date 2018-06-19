const request = require("request"),
    fs = require('fs'),
    cheerio = require("cheerio");

request({
  uri: "https://jerelia.com/ru-ru",
}, function(error, response, body) {
  const $ = cheerio.load(body),
        children = $('#navbar-brand_size_lg .navbar-center > li'),
        menu = {};

  const links = [];
  for (var i = 0; i < children.length; i++) {
    const group = $(children[i]),
          subGroups = group.find('.main-menu-children dt, .main-menu-children dd'),
          parent = $(group.children()[0]).text().trim();

    links.push({
      title: parent,
      parent: ''
    });
    let subParent = '';
    for (var j = 0; j < subGroups.length; j++) {
      // links.push( 'https://jerelia.com' + $( $(subGroups[j]).children()[0] ).attr('href') );
      if (subGroups[j].name == 'dt') {
        subParent = $( $(subGroups[j]).children()[0] ).text().trim();

        links.push({
          title: subParent,
          parent: parent
        });
      } else {
        let subGroupTitle = $( $(subGroups[j]).children()[0] ).text().trim();

        links.push({
          title: subGroupTitle,
          parent: subParent
        });
      }
    }

  }

  fs.writeFile('documents/groups-links-ru.txt', JSON.stringify(links), function(err) { if (err) throw err; });

});