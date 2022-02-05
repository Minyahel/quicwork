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
})

module.exports = router;