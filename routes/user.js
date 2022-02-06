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
    res.send("This will allow a user to signup");
}).post('/signup', (req, res, next) => {
    res.send("This will allow a user to signup");
}).delete('/:userId', (req, res, next) => {
    res.send("This will allow an admin to delete user " + req.params.userId);
})

module.exports = router;