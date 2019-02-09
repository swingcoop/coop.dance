const api     = require('./api.js');
const authUser = require('./auth/user.js');
const getProfile = require('./profile/get.js');

module.exports = api(async ctx => {
   await authUser(ctx);

   var userId = ctx.state.user.user_id;
   ctx.status = 200;
   ctx.body = await getProfile(userId);
});