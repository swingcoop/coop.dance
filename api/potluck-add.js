const api     = require('./api.js');
const potluck = require('./reservations/potluck.js');

module.exports = api(potluck);