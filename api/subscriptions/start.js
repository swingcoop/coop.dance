const { json } = require('micro');
const twilio = require('./twilio-verify.js');

module.exports = async (req, res) => {
   const body = await json(req);
   
   twilio.start(body.phone)
   .then(() => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
   })
   .catch(err => {
      throw err;
   });

   return;
};