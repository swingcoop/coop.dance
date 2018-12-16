// koajs stack for lambas
//
const bodyParser = require('koa-bodyparser');
const Koa = require('koa');

function api(fn) {
   if (process.env.DEV_LOCAL)
      return fn;

   const app = new Koa();

   app.use(bodyParser());
   app.use(fn);

   // Returns (req, res)
   return app.callback();
}

module.exports = api;