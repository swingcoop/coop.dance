var Airtable = require('airtable');
var base = Airtable.base(process.env.AIRTABLE_SUBSCRIPTIONS_BASE);

module.exports = function (params) {
   return new Promise(function (resolve, reject) {
      base('Subscriptions').create({
         "Phone": params.phone,
         "Zip Code": params.zip || ""
      },
      function (err, record) {
         if (err) { 
            reject(err); 
            return;
         }
         resolve(record);
      });
   });
};