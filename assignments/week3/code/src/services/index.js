const feelings = require('./feelings/feelings.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(feelings);
  app.configure(users);
};
