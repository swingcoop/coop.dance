const api     = require('./api.js');
const authUser = require('./auth/user.js');
const putProfile = require('./profile/put.js');
const getProfile = require('./profile/get.js');

module.exports = api(async ctx => {
   await authUser(ctx);

   var userId = ctx.state.user.user_id;
   var oldProfile = await getProfile(userId);

   var model = ctx.request.body;
   ctx.assert(model.id === oldProfile.id, 400, "Invalid record ID");
   
   await putProfile(model.id, model.fields);
   ctx.status = 200;
});