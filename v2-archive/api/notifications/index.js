const guests = require('./guests.js');

module.exports = () => {
   guests().then(data => {
      data = data.filter(x => !x.profile || x.profile.announcements);
      console.log(data);
   })
   .catch(err => {
      console.log(err);
   });
};
