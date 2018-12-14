const accounts = require('./accounts.js');

module.exports = () => {
   return accounts().then(all => {
      return all
         .filter(a => a.phone_number && a.phone_verified)
         .map(a => a.phone_number);
   });
};