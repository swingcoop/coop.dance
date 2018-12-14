const userMiddleware = require('./user.js');
const kafka = require('./kafka.js');
const { json } = require('micro');

async function addAnnouncement(req, res) {
   const body = await json(req);

   if (!body.message) {
      res.statusCode = 400;
      res.end("Propery required: message");
      return;
   }

   var venue = 'swingcoop';
   // TODO: How to use topics and keys?
   const producer = kafka.producer();
   await producer.connect();
   await producer.send({
      topic: 'announcements',
      messages: [
         { key: venue, value: body.message }
      ]
   });

   await producer.disconnect();
   res.statusCode = 200;
   res.end("Ok");
   return;
}

module.exports = async (req, res) => {
   try {
      const user = await userMiddleware(req, res);
      if (user 
         && user.app_metadata 
         && user.app_metadata.authorization
         && user.app_metadata.authorization.roles
         && user.app_metadata.authorization.roles.includes("Announcer")) {
         await addAnnouncement(req, res);
         return;
      }

      res.statusCode = 401;
      res.end("Authorization required");
   }
   catch(err) {
      console.log(err);
      res.statusCode = 500;
      res.end("Server error");
   };

   return;
};