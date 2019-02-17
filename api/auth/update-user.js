const patchMetadata = require('./patch-metadata.js');

module.exports = async ctx => {
   var authHeader = ctx.req.headers['authorization'];
   ctx.assert(authHeader, 401);

   var items = authHeader.split(" ");
   var msg = "Authorization header must be in format: '<type> <token>'";
   ctx.assert(items.length >= 2, 400, msg);

   var metadata = ctx.request.body;
   ctx.assert(metadata, 400);

   var idToken = items[1];
   var res = await patchMetadata(idToken, metadata);
   ctx.assert(res, 500);

   return res;
};