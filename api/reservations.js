const api = require('./api.js');
const reservations = require('./reservations/index.js');

module.exports = api(reservations);
