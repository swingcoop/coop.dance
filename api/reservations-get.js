const api = require('./api.js');
const reservations = require('./reservations/get.js');

module.exports = api(reservations);
