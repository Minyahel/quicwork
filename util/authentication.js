const User = require("../models/user");

module.exports = {
  adminAuth: (req, res, next) => {
    if (!req.session.userId) return next(new Error("You are not logged in"));

    User.findById(req.session.userId, (err, result) => {
      if (err) return next(err);
      if (!result.admin)
        return next(new Error("You don't have the facilities for dat big man"));
      next();
    });
  },
  userAuth: (req, res, next) => {
    if (!req.session.userId) return next(new Error("You are not logged in"));
    next();
  }
};
