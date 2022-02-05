const express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.get('/', (req, res, next) => {
    Post.find({}, (err, result) => {
        if (err) next(err);
        else res.json(result);
    })
})

module.exports = router;