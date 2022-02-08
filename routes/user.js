const express = require("express");
var router = express.Router();
var User = require("../models/user");
var { adminAuth, userAuth } = require("../util/authentication");

router
  .get("/", adminAuth, (req, res, next) => {
    var users = User.find({}, (err, result) => {
      if (err) return next(err);
      res.json(result);
    });
  })
  .post("/login", (req, res, next) => {
    if (req.session.userId) {
      console.log(req.session);
      res.send("You are already logged in");
      return;
    }

    if (!req.body.email || !req.body.password)
      throw new Error("You need a username and password");

    User.findOne({ email: req.body.email }, (err, result) => {
      if (err) return next(err);
      if (result) {
        var user = result;
        result.comparePassword(req.body.password, function (err, result) {
          if (err) next(new Error("Wrong email or password"));
          req.session.userId = user._id;
          res.send("Welcome " + user.username);
        });
      } else {
        throw new Error("Wrong email or password");
      }
    });
  })
  .post("/logout", (req, res, next) => {
    req.session.destroy();
    res.send("Successfuly logged out");
  })
  .post("/signup", (req, res, next) => {
    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
    });

    User.find({ email: user.email }, (err, person) => {
      if (err) next(err);
      //if any person entry with the same email is found don't add that person account
      if (person.length > 0) {
        console.log(person);
        next(new Error("Email already in use!"));
        return;
      } else {
        user.save((err, suc) => {
          if (err) throw err;
          else {
            req.session.userId = user._id;
            res.send("Successfuly signed up");
          }
        });
      }
    });
  })
  .delete("/:userId", adminAuth, (req, res, next) => {
    User.findByIdAndDelete(req.params.userId, (err, result) => {
      if (err) return next(err);
      res.send("Successfuly deleted user");
    });
  });

module.exports = router;
