const express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res, next) => {
    var users = User.find({}, (err, result) => {
        if (err) next(err);
        else {
            res.json(result)
        }
    })
}).post('/login', (req, res, next) => {
    res.send("Welcome back");
}).post('/signup', (req, res, next) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
    })

    User.find({email: user.email}, (err, person) => {
        if (err) next(err);
        //if any person entry with the same email is found don't add that person account
        if (person.length > 0) {
            console.log(person);
            next(new Error("Email already in use!"));
            return;
        } 
        else {
            user.save((err, suc) => {
                if (err) throw err;
                else console.log("saved");
            })
            res.send('Successfuly signed up');
        }
    })
}).delete('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, result) => {
        if (err) next(err);
        User.findById(req.body.user, (err, result) => {
            if (err) next(err);
            if (!result.admin) next(new Error("You are not an Admin!"));
            User.findByIdAndDelete(req.params.userId, (err, result) => {
                if (err) next(err);
                res.send("Successfuly deleted user");
            })
        })
    })
})

module.exports = router;