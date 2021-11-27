const api     = require('./api.js');
const potluck = require('./potluck/post.js');

module.exports = api(potluck);