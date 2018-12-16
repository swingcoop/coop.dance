// koa stack for lambas
//
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');

function api(fn) {
   const app = new Koa();

   app.use(bodyParser());
   app.use(fn);

   // TODO: Should we catch empty statuses?
   //
   // app.use(async ctx => {
   //    if (!ctx.status) {
   //       ctx.status = 200;
   //    }
   // });

   // Returns (req, res)
   return app.callback();
}

module.exports = api;