/*
	Made for handling all api requests related to posts: 
	* Getting all posts
	* Creating a new post
	* Getting a specific post
	* Deleting a specific post
	* Posting a comment
	* Liking a post (toggle)
	* Deleting a specific comment
*/

const express = require('express');
const { Each } = require('jade/lib/nodes');
var router = express.Router();
var { Post, Comment, Like } = require('../models/post');
var User = require('../models/user');
const { userAuth } = require('../util/authentication');

router
    .get('/', (req, res, next) => {
        //get all posts, no authentication required
        Post.find({}, (err, result) => {
            if (err) return next(err);
            else res.json(result);
        });
    })
    .post('/', userAuth, (req, res, next) => {
        //create new post object from schema, must be logged in
        var newPost = new Post({
            postedBy: req.session.userId,
            postTime: req.body.postTime,
            description: req.body.description,
            site: req.body.site,
            comments: [],
            likes: []
        });
        //safe new post
        newPost.save((err, succ) => {
            if (err) return next(err);
            else {
                res.send('Successfuly posted');
            }
        });
    })
    .get('/:postId', (req, res, next) => {
        //get a specific post, no authentication required
        Post.findById(req.params.postId, (err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    })
    .delete('/:postId', userAuth, (req, res, next) => {
        var post;
        //find the required post
        Post.findById(req.params.postId, (err, result) => {
            if (err) return next(err);
            post = result;
            //check if the post to be deleted was posted by the logged in user
            if (post.postedBy.toString() !== req.session.userId)
                return next(new Error('Not admin or poster!'));
            else {
                //delete the given post if passed checks
                Post.findByIdAndDelete(req.params.postId, (err, result) => {
                    if (err) return next(err);
                    else res.send('Successfuly deleted post!');
                });
            }
        });
    })
    .post('/:postId/comment', userAuth, (req, res, next) => {
        var post;
        //find the required post to comment, need to be logged in
        Post.findById(req.params.postId, (err, result) => {
            if (err) return next(err);
            post = result;
            //push a new comment object into comments, no need to save as it will
            //saved as a sub document
            post.comments.push(
                new Comment({
                    body: req.body.body,
                    user: req.session.userId
                })
            );
            //save the changes made to the post
            post.save((err, result) => {
                if (err) return next(err);
                res.send('Successfuly created comment!');
            });
        });
    })
    .delete('/:postId/comments/:commentId', userAuth, (req, res, next) => {
        var post;
        //find the required post, requires user to be logged in
        Post.findById(req.params.postId, (err, result) => {
            if (err) return next(err);
            post = result;

            //look for the index of  required comment  in the comments of the post
            //by iterating through them
            let i = 0;
            for (; i < post.comments.length; i++) {
                if (post.comments[i]._id.toString() === req.params.commentId)
                    break;
            }
            //throw error if the required comment in not there
            if (i == post.comments.length)
                return cb(new Error("Comment doesn't exist"), null);
            //if the comment is found, check whether the current user is the one
            //that made the comment, if not throw error
            if (post.comments[i].user.toString() !== req.session.userId)
                return next(new Error("Can't delete someone else's comment!"));
            //call the delete comment method of the post by indicating which comment
            //to delete
            post.deleteComment(i, (err, result) => {
                if (err) return next(err);
                res.send('Successfuly deleted comment!');
            });
        });
    })
    .post('/:postId/like', userAuth, (req, res, next) => {
        /* find the required post by passing the required post and the user id,
        the user id is used to check whether the user has already liked the post */
        Post.find(
            { _id: req.params.postId, 'likes.user': req.body.user },
            (err, result) => {
                if (err) next(err);
                else {
                    //if the user has already liked the post proceed to unlike
                    if (result.length > 0) {
                        var count = 0;
                        //iterate through the likes looking for the index of the
                        //like of the current user
                        for (; count < result[0].likes.length; count++)
                            if (
                                result[0].likes[count].user.toString() ===
                                req.body.user
                            )
                                break;
                        //remove the like of the current user from the  array
                        result[0].likes.splice(count, 1);
                        //save the post, result[0] is the post
                        result[0].save((err, result) => {
                            if (err) next(err);
                            else res.json(result);
                        });
                    } else {
                        //if the user hasn't liked the post, fetch the post again (bad) and add the like to the post
                        Post.findById(req.params.postId, (err, result) => {
                            if (err) next(err);
                            else {
                                //push a new like object to the list
                                result.likes.push(
                                    new Like({
                                        user: req.body.user
                                    })
                                );
                                //save the post
                                result.save((err, result) => {
                                    if (err) next(err);
                                    else res.json(result);
                                });
                            }
                        });
                    }
                }
            }
        );
    });

module.exports = router;
