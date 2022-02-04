var express = require("express");
var router = express.Router();

router.get('/login', (req, res, next) => {
    res.send("This is the login page");
})

router.post('/login', (req, res, next) => {
    console.log('here');
    console.log(req.body);
    res.send("this");
})


module.exports = router;