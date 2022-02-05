const express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req, res, next) => {   
    var users = User.find({})
    
    console.log(users);

    res.send("sent");

})

module.exports = router;