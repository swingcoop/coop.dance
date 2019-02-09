var Airtable = require('airtable');

const guests = 'appd2b9uxuJEkHnwE';
const base = Airtable.base(guests);

function put(recordId, fields) {
    return new Promise(function (resolve, reject) {
        // Never update the ID field
        delete fields['ID'];
        base('Profiles')
        .update(recordId, fields, function (err, record) {
            if (err) { 
                reject(err);
                return; 
            }
            resolve(record);
        });
    });
};

module.exports = put;