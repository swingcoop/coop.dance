const api = require('./api.js');

const { Pool, Client } = require('pg')
const connectionString = process.env.POSTGRESQL_SUBSCRIPTIONS;

module.exports = api(async ctx => {
   ctx.assert(ctx.request.query.publisher, 400, 'publisher query param required');

   const client = new Client({ connectionString });
   client.connect();

   try {
      await client.query(`CREATE TABLE IF NOT EXISTS subscriptions (
         reader varchar(64) NOT NULL,
         publisher varchar(64) NOT NULL
      )`);

      const readers = `
         SELECT reader FROM subscriptions
          WHERE publisher = $1`;

      const values = [ctx.request.query.publisher];

      var res = await client.query(readers, values);
      ctx.body = res.rows;
      ctx.status = 200;
      client.end();
   }
   catch (err) {
      client.end();
      console.log(err);
      ctx.status = 500;
   }
});