const axios = require('axios');
const key = process.env.TWILIO_API_KEY;

const https = axios.create({
  baseURL: 'https://api.authy.com',
  timeout: 5000, // milliseconds
  headers: {'X-Authy-API-Key': key }
});

if (!key) {
   throw new Error(
      "TWILIO_API_KEY is not defined. " +
      "Please add it as an environment variable");
}

module.exports = {
   start: function (phoneNumber) {
      var url = '/protected/json/phones/verification/start';
      return https.post(url, {
         "country_code": 1, // TODO: Global
         "phone_number": phoneNumber,
         "via": "sms", // TODO: Everyone
         "locale": "en" // TODO: Multilingual
      });
   },
   check: function (phoneNumber, verificationCode) {
      var url = '/protected/json/phones/verification/check';
      return https.get(url, { 
         params: { 
            "country_code": "1", // TODO: Global
            "phone_number": phoneNumber,
            "verification_code": verificationCode
         }
      });
   }
};