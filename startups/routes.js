const users = require("../routes/users");
const merchants = require("../routes/merchants");
const auth = require("../routes/auth");
const post = require("../routes/post");
const error = require("../middlewares/error");
module.exports = function(app) {
  app.use("/api/users", users);
  app.use("/api/merchants", merchants);
  app.use("/api/post", post);
  app.use("/api/auth", auth);
  app.use(error);
};
