const axios = require('axios');

module.exports = async (ctx, next) => {
   try {
      let hook = 'https://hooks.zapier.com/hooks/catch/3680855/03q1z4/';
      await axios.post(hook, ctx.request.body);
   }
   catch (err) {
      ctx.throw(500, err);
   }
};