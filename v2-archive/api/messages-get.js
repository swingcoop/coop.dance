
const api = require('./api.js');
const axios = require('axios');

// Keeping Airtable data around for maybe venues
// const Airtable = require('airtable');
// const messages = 'appzS2C8RlCz74lNI';
// const base = Airtable.base(messages);

function get() {
    return axios.get('http://messages.dance.coop')
        .then(res => {
            return res.data.map(x=> x.data);
        });
};

module.exports = api(async ctx => {
  ctx.body = await get();
  ctx.status = 200;
});