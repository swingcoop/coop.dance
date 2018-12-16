const userInfo = require('./user-info.js');

module.exports = async ctx => {
   if (ctx.state.user) {
      return ctx.state.user;
   }

   var authHeader = ctx.req.headers['authorization'];
   ctx.assert(authHeader, 401);

   var items = authHeader.split(" ");
   var msg = "Authorization header must be in format: '<type> <token>'";
   ctx.assert(items.length >= 2, 400, msg);

   var idToken = items[1];
   var user = await userInfo(idToken);
   ctx.assert(user, 403);

   return ctx.state.user = user;
};