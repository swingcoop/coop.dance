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

   var url = '/protected/json/phones/verification/start';
   try {
      let response = await https.post(url, {
         "country_code": 1,
         "phone_number": js.phone,
         "via": "sms",
         "locale": "en"
      });
   } catch (err) {
      throw err;
   }

   res.setHeader('Content-Type', 'application/json');
   res.end(JSON.stringify(js));
   return;
};