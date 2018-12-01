const { json } = require('micro');
const axios = require('axios');
const key = process.env.TWILIO_API_KEY;

const https = axios.create({
  baseURL: 'https://api.authy.com',
  timeout: 5000,
  headers: {'X-Authy-API-Key': key }
});

module.exports = async (req, res) => {
   const js = await json(req);

   if (!key) {
      res.end("API key not specified");
      return;
   }

   res.setHeader('Content-Type', 'application/json');

   var url = '/protected/json/phones/verification/check';
   https.get(url, { 
      params: { 
         "country_code": "1",
         "phone_number": js.phone,
         "verification_code": js.code
      }
   }).then(response => {
      if (response.data.success) {
         // TODO: save js.phone
      }
      res.end(JSON.stringify(response.data));
   }).catch(err => {
      res.end(JSON.stringify(err.response.data));
   });

   return;
};