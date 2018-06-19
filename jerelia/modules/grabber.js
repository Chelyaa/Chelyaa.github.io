const request = require('request'),
      cheerio = require("cheerio"),
      fs = require('fs'),
      dataWorker = require('./data'),
      Entities = require('html-entities').XmlEntities;
 
const entities = new Entities();

const grabber = {

  getProduct: function(url, callback) {
    request(url, (err, response, body) => {

      const $ = cheerio.load(body);
      let product = {};

      product.articul = url.split('/').pop();
      product.name = $('#product-name').text().trim();
      product.priceNew = $('.price-new').text().trim();
      product.priceOld = $('.price-old').text().trim();
      product.seria = $( $('p > a') ).text().trim();


      let attributesList = $( $('.list-unstyled')[0] ).children().map((i, el) => { $(el).text() });


      for (let i = 0; i < attributesList.length; i++) {
        attribute = attributesList[i].split(':');
        if (attribute[0] === 'Артикул') continue;

        product.amount = attribute[1].trim();
      }
      

      if ($('.sel-prop')) {
        let colors = $('.prop-item');
        product.colors = {};
        
        for (let i = 0; i < colors.length; i++) {
          let color = $(colors[i]),
              pcode = color.attr('data-pcode'),
              title = $( color.children()[0] ).attr('title');

          product.colors[pcode] = title;
        }
      }


      let imgs = $('a[data-gallery] img').map((i, el) => { return $(el).attr('src') });

      product.imgs = Array.prototype.join.call(imgs, ',');

      let about = $('#aboutproducttab > .padding-10').html();
      about = removeTag('span', about);
      about = removeTag('font', about);
      about = removeTag('o:p', about);
      about = removeTag('hr', about);
      about = removeTag('strong', about);
      about = removeTag('i', about);
      about = removeTag('b', about);
      about = about.replace(/<p.*?>/sig, '<p>');
      about = about.replace(/<h3.*?>/sig, '<h3>');
      about = about.replace(/\n/g, "");
      about = about.replace(/\\'/g, "");
      product.about = entities.decode(about).trim();
            
      callback(product);

    });
  },

  saveProduct: function(product) {
    dataWorker.read()
      .then(data => {
        data[product.articul] = product;
        dataWorker.save(data);
      });
  },

  saveGroup: function(url) {
    return new Promise(res => {
      request(url, (err, response, body) => { 

        const $ = cheerio.load(body),
              links = $('.prod-info-block > a, .prod-info-block > h3 > a').map((i, el) => { return 'https://jerelia.com' + $(el).attr('href') });
        
        let groupTitle = $('.product-group-hd').text().trim().toLowerCase();
        groupTitle = groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1);

        console.log(groupTitle + ' ' + links.length + ' products');

        if (links.length === 0) return res();
        dataWorker.read()
          .then(data => {
            const self = this;
            recurse(0);
            function recurse(i) {
              if (i >= links.length) return;
              let articul = links[i].split('/').pop();

              if (articul in data) {

                let groups = data[articul].groups.split(',');
                if (groups.filter(group => group === groupTitle).length === 0) {
                  groups.push(groupTitle);
                  data[articul].groups = groups.join(',');
                  dataWorker.save(data)
                    .then(() => {
                      console.log(i + '(' + links.length + '). ' + groupTitle + ': ' + articul + ' updated');
                      if (i+1 >= links.length)
                        res();
                      else
                        recurse(i+1);
                    });
                } else {
                  console.log(i + '(' + links.length + '). ' + groupTitle + ': ' + articul + ' is not changed');
                  if (i+1 >= links.length)
                    res();
                  else
                    recurse(i+1);
                }


              } else {

                self.getProduct(links[i], (product) => {
                  product.groups = groupTitle;
                  data[articul] = product;
                  dataWorker.save(data)
                    .then(() => {
                      console.log(i + '(' + links.length + '). ' + groupTitle + ': ' + articul + ' saved');
                      if (i+1 >= links.length)
                        res();
                      else
                        recurse(i+1);
                    });
                });

              }
            }
          });

      });
    });
  },

  grabbing: function(sectionTitle) {
    fs.readFile('documents/catalog-structure.json', (err, data) => {
      if (err) throw err;

      const structure = JSON.parse(data),
            section = structure[sectionTitle];

      for (let key in section) {
        let group = section[key];
        this.saveGroup(group.link)
          .then(() => {console.log(key + ' saved');
            if ( Object.keys(group.subGroups).length > 0 ) {
              for(let key in group.subGroups) {
                // this.saveGroup(group[key].link);
              }
            }
          });
      }
    });
  },

  grabNextGroup: function() {
    return new Promise((res) => {
      fs.readFile('documents/groups-links-ru.txt', (err, data) => {
        if (err) throw err;

        let links = (''+data).split(';'),
            index = links.pop();

        console.log("\n");
        console.log(index + '(' + links.length + ')');
        if (index >= links.length) {
          console.log('All saved');
          return;
        }

        this.saveGroup(links[index])
          .then(() => {
            links.push(+index + 1);
            fs.writeFile('documents/groups-links-ru.txt', links.join(';'), err => { if (err) throw err; res(); });
          });
      });
    });
  }

}

function removeTag(tag, str) {
  var reg = new RegExp('<' + tag + '.*?>', 'g', 'i', 's');
  str = str.replace(reg, '');

  var reg = new RegExp('</' + tag + '.*?>', 'g', 'i', 's');
  str = str.replace(reg, '');
  return str;
}

function decodeHtmlEntity(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
}

module.exports = grabber;