require('dotenv').config();

const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');

const Koa = require('koa');
const app = new Koa();

// webwebweb
app.use(serve('./www'));

// Parse json
app.use(bodyParser());

// Routes
const add = require('./api/notifications-add.js');
app.use(_.post('/api/notifications/add', add));

const send = require('./api/notifications-send.js');
app.use(_.post('/api/notifications/send', send));

app.use(ctx => {
   ctx.assert(ctx.body || ctx.body === null, 418);
});

app.listen(8080);