const api       = require('./api.js');
const authUser  = require('./auth/user.js');
const kafka     = require('./notifications/kafka.js');
const uuid      = require('uuid/v4');
const dateformat = require('dateformat');

async function addMessage(ctx) {
   const body = ctx.request.body;
   ctx.assert(body && body.title, 400, "Propery required: title");

   var now = dateformat(new Date(), 'yyyy-mm-dd');
   body.endDate = body.endDate || body.startDate || now;

   var message = { 
      value: JSON.stringify(body),
      headers: {
         userId: ctx.state.user.user_id,
         timestamp: new Date().toString(),
         uuid: uuid()
      }
   };

   try {
      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
         topic: 'messages-0.2.0',
         messages: [ message ]
      });

      await producer.disconnect();
      ctx.status = 200;
   }
   catch (err) {
      console.log(err);
      ctx.status = 500;
   }
}

module.exports = api(async ctx => {
   // Any authenticated user can post a message
   await authUser(ctx);
   await addMessage(ctx);
});