const userInfo = require('./user-info.js');

module.exports = (req, res) => {
   var authHeader = req.headers['authorization'];
   if (!authHeader) {
      res.statusCode = 401;
      res.end("Authorization required");
      return;
   }

   var items = authHeader.split(" ");
   if (items.length < 2) {
      res.statusCode = 400;
      res.send("Authorization header must be in format: '<type> <token>'");
      return;
   }

   var token = items[1];
   return userInfo(token);
};