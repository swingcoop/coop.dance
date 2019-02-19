const api       = require('./api.js');
const authUser  = require('./auth/user.js');
const kafka     = require('./notifications/kafka.js');

async function addMessage(ctx) {
   const body = ctx.request.body;
   ctx.assert(body && body.message, 400, "Propery required: message");

   try {
      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
         topic: 'messages-0.1.0',
         messages: [{ 
            value: body.message,
            headers: {
               userId: ctx.state.user.user_id,
               timestamp: '' + Date.now()
            }
         }]
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