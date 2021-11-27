const api     = require('./api.js');
const patchMetadata = require('./auth/update-user.js');

module.exports = api(async ctx => {
   await patchMetadata(ctx);
   ctx.status = 200;
});