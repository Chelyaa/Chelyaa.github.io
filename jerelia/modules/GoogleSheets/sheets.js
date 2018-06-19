const fs = require('fs'),
      google = require('googleapis'),
      googleAuth = require('./google-auth'),
      spreadsheetId = '1IjH-Elp1yHy8BdjQ_3Iv3r_5c3kn_5jAwjOcpFbC_7I',
      googleSheets = google.sheets('v4');

const sheets = {

  addProduct: product => {
    return new Promise(res => {
      googleAuth()
      .then((auth) => {
        let colorsTitles = [],
            colorsArticuls = [];

        for (key in product.colors) {
          colorsTitles.push( product.colors[key].split('(')[0] );
          colorsArticuls.push(key);
        }

        const body = {
          majorDimension: "ROWS",
          values: [
            [product.articul, product.name, product.seria, product.priceOld, product.priceNew, 
              colorsTitles.join(','), colorsArticuls.join(','), product.imgs, product.groups, product.about]
          ]
        };
        googleSheets.spreadsheets.values.append({
          auth: auth,
          spreadsheetId: spreadsheetId,
          range: "A1:K1",
          valueInputOption: 'RAW',
          resource: body
        }, (err, result) => {
          if (err) throw err;
          res();
        });
      });
    });
  },

  addGroup: group => {
     return new Promise(res => {
      googleAuth()
      .then((auth) => {
        const body = {
          majorDimension: "ROWS",
          values: [
            [group.title, group.parent]
          ]
        };
        googleSheets.spreadsheets.values.append({
          auth: auth,
          spreadsheetId: spreadsheetId,
          range: "Groups!A1:C1",
          valueInputOption: 'RAW',
          resource: body
        }, (err, result) => {
          if (err) throw err;
          res(group.title);
        });
      });
    });
  }

}

module.exports = sheets;


