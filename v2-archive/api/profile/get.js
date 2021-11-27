var Airtable = require('airtable');

const guests = 'appd2b9uxuJEkHnwE';
const base = Airtable.base(guests);

function get(userId) {
    return new Promise(function (resolve, reject) {
        var val = [];
        base('Profiles')
        .select({
            view: "Grid view",
            filterByFormula: "SEARCH(\"" + userId + "\", {ID})"
        })
        .eachPage(function page(records, nextPage) {
            if (records.length > 0) {
                var record = records.pop();
                resolve({
                    id: record.id,
                    fields: record.fields
                });
                return;
            }
            reject("No record found");
        }, function done(err) {
            if (err) { 
              reject(err); 
              return; 
            }
        });
    });
};

module.exports = get;