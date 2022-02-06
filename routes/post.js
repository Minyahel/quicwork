const express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
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
    if (!req.body.user) throw err;
    //get the user first, then get the post, then compare credentials to 
    //delete or not
    User.findById(req.body.user, (err, result) => {
        var user = result;
        if (err) next(err);
        else {
            var post;
            Post.findById(req.params.postId, (err, result) => {
                if (err) next(err);
                post = result;
                if (!user.admin && post.postedBy.toString() !== req.body.user) next(new Error("Not admin or poster!"));
                else {
                    Post.findByIdAndDelete(req.params.postId, (err, result) => {
                        if (err) next(err);
                        else res.send("Successfuly deleted post!");
                    })
                }
            })

        }
    })
})

module.exports = router;