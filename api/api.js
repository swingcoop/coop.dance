// koa stack for lambas
//
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');

function api(fn) {
   const app = new Koa();

   app.use(bodyParser());

   app.use(async (ctx, next) => {
      await next();
      if (ctx.status === 404) {
         // The default koa status is 404, but
         // in our API layer 204 is more useful.
         ctx.status = 204;
      }
   });
   app.use(fn);

   // Returns (req, res)
   return app.callback();
}

module.exports = api;