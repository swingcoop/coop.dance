const api = require('./api.js');
const twilio = require('./twilio-verify.js');
const add = require('./add.js');

function confirm(params) {
   return twilio.check(params.phone, params.code)
      .then(reply => {
         if (reply.data.success) {
            return add({
               phone: params.phone,
               zip: params.zip || ""
            });
         }
         return reply.data;
      })
      .catch(err => {
         return err.reply.data;
      });
}

module.exports = api(confirm);