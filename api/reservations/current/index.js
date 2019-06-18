var Airtable = require('airtable');
// var api = require('../../subscriptions/api.js');

const reservations = 'app9CS49PJx8xtYP4';
const base = Airtable.base(reservations);

function get() {
    return new Promise(function (resolve, reject) {
        var val = [];
        base('Current')
        .select({
            fields: [ "Role", "Any", "Saturday", "Sunday" ],
            view: "Grid View"
        })
        .eachPage(function page(records, nextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
              val.push(record.fields);
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            nextPage();

        }, function done(err) {
            if (err) { 
              reject(err); 
              return; 
            }
            resolve(val);
        });
    });
};

module.exports = async (req, res) => {
    var val = await get();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(val));
    return;
};