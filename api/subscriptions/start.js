const api = require('./api.js');
const twilio = require('./twilio-verify.js');

function start(params) {
   return twilio.start(params.phone)
      .then(() => params)
      .catch(err => {
         throw err;
      });
}

module.exports = api(start);