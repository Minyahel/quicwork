const express = require('express');
var router = express.Router();
var { Post, Comment } = require('../models/post');
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
    Post.findById(req.params.postId, (err, result) => {
        if (err) next(err);
        res.json(result);
    })
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
}).post('/:postId/comment', (req, res, next) => {
    var post; 
    Post.findById(req.params.postId, (err, result) => {
        if (err) next(err);
        post = result;
        console.log(post);
        post.comments.push(new Comment({
            "body" : req.body,
            "user" : req.user
        }))
        post.save((err, result) => {
            if (err) next(err);
            res.send("Comment created");
        })
    })
}).delete('/:postId/comments/:commentId', (req, res, next) => {
    res.send("deleting comment " + req.params.commentId + " from post " + req.params.postId);
}).post('/:postId/like', (req, res, next) => {
    res.send("Liking post " + req.params.postId);
})

module.exports = router;