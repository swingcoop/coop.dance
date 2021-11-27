const api = require('./api.js');
const reservations = require('./swingout/reservations.js');

module.exports = api(reservations);
