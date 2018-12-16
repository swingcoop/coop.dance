const api        = require('./api.js');
const authEnsure = require('./auth/ensure.js');
const phones     = require('./notifications/phones.js');

const axios = require('axios')
const qs    = require('querystring');

var twilioAcct = process.env.TWILIO_ACCOUNT;
var twilioToken = process.env.TWILIO_API_KEY;
var twilioClient = process.env.TWILIO_MESSAGE_CLIENT;

var messageUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAcct}/Messages.json`;

function send(txt, toPhone) {
   // Use the Twilio HTTP API directly. 
   var data = qs.stringify({
      MessagingServiceSid: twilioClient,
      Body: txt,
      To: toPhone
   });

   var config = {
      auth: {
       username: twilioAcct,
       password: twilioToken
     }
   };

   return axios.post(messageUrl, data, config)
      .catch(err => {
         console.log(err);
      });
}

async function sendToPhones(txt) {
   const numbers = await phones();
   var everyone = numbers.map(num => send(txt, num));
   await axios.all(everyone);
}

module.exports = api(async ctx => {
   // Require "Announcer" permissions to send txts
   await authEnsure(ctx, "Announcer");

   const body = ctx.request.body;
   ctx.assert(body && body.txt, 400);

   await sendToPhones(body.txt);
   ctx.status = 200;
});