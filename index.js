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
const add = require('./api/add.js');
app.use(_.post('/api/notifications/add', add));

app.listen(8080);