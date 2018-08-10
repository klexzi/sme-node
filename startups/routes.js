const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middlewares/error');
module.exports = function (app) {
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
};