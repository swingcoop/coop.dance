const Airtable = require('airtable');
const api = require('./api.js');

const messages = 'appzS2C8RlCz74lNI';
const base = Airtable.base(messages);

function get() {
    return new Promise(function (resolve, reject) {
        var val = [];
        base('Messages')
        .select({
            fields: [ 
                "Created", 
                "Title",
                "Message", 
                "Host",
                "Venue",
                "Address",
                "City",
                "Zip", 
                "Tags",
                "RegistrationType" 
            ],
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

module.exports = api(async ctx => {
  ctx.body = await get();
  ctx.status = 200;
});