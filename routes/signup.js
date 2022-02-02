var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This will be the signup page");
})

module.exports = router;