const { json } = require('micro');
const twilio = require('./twilio-verify.js');

module.exports = async (req, res) => {
   const body = await json(req);

   res.setHeader('Content-Type', 'application/json');

   twilio.check(body.phone, body.code)
   .then(response => {
      if (response.data.success) {
         // TODO: save js.phone
      }
      res.end(JSON.stringify(response.data));
   })
   .catch(err => {
      res.end(JSON.stringify(err.response.data));
   });

   return;
};