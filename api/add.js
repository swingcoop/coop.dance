const api        = require('./api.js');
const authEnsure = require('./auth/ensure.js');
const kafka      = require('./notifications/kafka.js');

async function addAnnouncement(ctx) {
   const body = ctx.request.body;
   ctx.assert(body && body.message, 400, "Propery required: message");

   try {
      var venue = 'swingcoop';
      // TODO: How to use topics and keys?
      const producer = kafka.producer();
      await producer.connect();
      await producer.send({
         topic: 'announcements-test',
         messages: [
            { key: venue, value: body.message }
         ]
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
   await authEnsure(ctx, "Announcer");
   await addAnnouncement(ctx);
});