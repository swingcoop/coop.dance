const api     = require('./api.js');
const authUser = require('./auth/user.js');

module.exports = api(async ctx => {
   await authUser(ctx);

   ctx.status = 200;
   ctx.body = ctx.state.user.user_metadata || {};
});