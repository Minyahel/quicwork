const express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    res.send("this is a specific post page");
})

module.exports = router;