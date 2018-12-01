const { json } = require('micro');

// 1. parse incoming json,
// 2. wait for the function,
// 3. send out json
module.exports = function api(fn) {
   return async function (req, res) {
      const body = await json(req);
      const result = await fn(body);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
   };
};