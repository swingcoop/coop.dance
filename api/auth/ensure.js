// ensure.js
const authUser = require('./user.js');

module.exports = async (ctx, role) => {
   const user = await authUser(ctx);

   ctx.assert(user 
      && user.app_metadata 
      && user.app_metadata.authorization
      && user.app_metadata.authorization.roles
      && user.app_metadata.authorization.roles.includes(role),
      403);
};