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

    user.save((err, suc) => {
        if (err) throw err;
        else console.log("saved");
    })

    res.send('received');
})

module.exports = router;