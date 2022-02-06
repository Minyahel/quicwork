const express = require('express');
var router = express.Router();
var Post = require('../models/post');

/*This router will handle everything related to handling posts
  such as getting all posts, deleting posts as well as creating 
  new posts
*/
router.get('/', (req, res, next) => {
    Post.find({}, (err, result) => {
        if (err) next(err);
        else res.json(result);
    })
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
}).get('/:postId', (req, res, next) => {
    res.send("This will send the data for a specific post ")
}).delete('/:postId', (req, res, next) => {
    res.send("This will delete the post " + req.params.postId);
})

module.exports = router;