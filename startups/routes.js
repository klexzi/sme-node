const users = require('../routes/users');
const error = require('../middlewares/error');
module.exports = function (app) {
    app.use('api/users', users);
    app.use(error);
};