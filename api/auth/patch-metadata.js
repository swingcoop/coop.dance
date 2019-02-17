const axios = require('axios');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const userInfoUrl = 'https://swing.auth0.com/userinfo';
const tokenUrl = 'https://swing.auth0.com/oauth/token';

var tokenRequest = {
   grant_type: 'client_credentials',
   client_id: process.env.AUTH0_USERS_ID,
   client_secret: process.env.AUTH0_USERS_KEY,
   audience: 'https://swing.auth0.com/api/v2/',
   scope: 'update:users'
};

module.exports = (idToken, metadata) => {

   return new Promise(function (resolve, reject) {
      const client = jwksClient({
        jwksUri: 'https://swing.auth0.com/.well-known/jwks.json'
      });

      // public:
      const kid = 'MDZERjE4REEzODlFNjk3RjJFMjM0NUYwMkI5NDEwQ0M5MTMzNDRCNw';
      client.getSigningKey(kid, (err, key) => {
         if (err) {
            reject(err);
            return;
         }
         const signingKey = key.publicKey || key.rsaPublicKey;

         var options = {
            algorithms: ["RS256","HS256"]
         };
         var payload = jwt.verify(idToken, signingKey, options);

         axios.post(tokenUrl, tokenRequest)
         .then(res => {
            var token = res.data.access_token;
            var httpConfig = {
               headers: {'Authorization': "Bearer " + token }
            };

            var url = 'https://swing.auth0.com/api/v2/users/' + payload.sub
            metadata = metadata || {};
            axios.patch(url, { user_metadata: metadata }, httpConfig)
            .then(res => {
               var userInfo = res.data;
               if (!userInfo) {
                  resolve({});
                  return;
               }

               resolve(userInfo);
            })
            .catch(err => {
               reject(err);
            });
         })
         .catch(err => {
            console.log(err);
            reject(err);
         });
      });
   });
};