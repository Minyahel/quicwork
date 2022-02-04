var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var User = require('../models/user');

router.get('/', (req, res, next) => {
    res.send("This will be the signup page");
}).post('/', (req, res, next) => {

    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
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
            res.send('received');
        }
    })
})

module.exports = router;