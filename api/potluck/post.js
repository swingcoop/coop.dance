const axios = require('axios');

module.exports = async (ctx, next) => {
   try {
      let hook = 'https://hooks.zapier.com/hooks/catch/3680855/01ktxg/';
      await axios.post(hook, ctx.request.body);
   }
   catch (err) {
      ctx.throw(500, err);
   }
};