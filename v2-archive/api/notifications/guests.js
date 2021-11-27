const accounts = require('./accounts.js');

module.exports = () => {
   return accounts().then(all => {
      return all
         .filter(a => a.phone_number && a.phone_verified)
         .map(a => ({
            profile: a.user_metadata,
            phone: a.phone_number
         }));
   });
};