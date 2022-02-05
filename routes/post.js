const express = require('express');
var router = express.Router();
var Post = require('../models/post');


router.get('/', (req, res, next) => {
    res.send("this is a specific post page");
}).post('/', (req, res, next) => {
    console.log(req.body);

    var newPost = new Post({
        postedBy: req.body.postedBy,
        postTime: req.body.postTime,
        description: req.body.description,
        site: req.body.site,
        comments: [],
        likes: []
    })

    newPost.save((err, succ) => {
        if (err) next(err);
        else {
            console.log("saved")
            res.send("posted");
        }
    })

})

module.exports = router;