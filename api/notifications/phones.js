const axios = require('axios');

var usersUrl = 'https://swing.auth0.com/api/v2/users';
var tokenUrl = 'https://swing.auth0.com/oauth/token';

var tokenRequest = {
   grant_type: 'client_credentials',
   client_id: process.env.AUTH0_USERS_ID,
   client_secret: process.env.AUTH0_USERS_KEY,
   audience: 'https://swing.auth0.com/api/v2/'
};

module.exports = () => {
   return axios.post(tokenUrl, tokenRequest)
   .then(res => {
      var token = res.data.access_token;
      var httpConfig = {
         headers: {'Authorization': "bearer " + token}
      };

      return axios.get(usersUrl, httpConfig)
      .then(res => {
         var accounts = res.data;
         if (!accounts)
            return [];

         var phoneNumbers = accounts
            .filter(a => a.phone_number && a.phone_verified)
            .map(a => a.phone_number);

         return phoneNumbers;
      });
   })
   .catch(err => {
      throw err;
   });
};