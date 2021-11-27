var Airtable = require('airtable');

const potluck = 'appwv2bmOs5byVsUL';
const base = Airtable.base(potluck);

function get() {
    return new Promise(function (resolve, reject) {
        var val = [];
        base('Lessons')
        .select({
            fields: [ "Type" ],
            view: "Grid view"
        })
        .eachPage(function page(records, nextPage) {
            records.forEach(function(record) {
              val.push(record.fields);
            });
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
    try {
        var val = await get();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(val));
    }
    catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
    return;
};