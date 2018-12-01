const api = require('./api.js');
const twilio = require('./twilio-verify.js');

function confirm(params) {
   return twilio.check(params.phone, params.code)
      .then(reply => {
         if (reply.data.success) {
            // TODO: save params.phone
         }
         return reply.data;
      })
      .catch(err => {
         return err.reply.data;
      });
}

module.exports = api(confirm);