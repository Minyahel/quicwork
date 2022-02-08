const express = require("express");
const { Each } = require("jade/lib/nodes");
var router = express.Router();
var { Post, Comment, Like } = require("../models/post");
var User = require("../models/user");
const { userAuth } = require("../util/authentication");
/*This router will handle everything related to handling posts
  such as getting all posts, deleting posts as well as creating 
  new posts
*/
router
  .get("/", (req, res, next) => {
    Post.find({}, (err, result) => {
      if (err) return next(err);
      else res.json(result);
    });
  })
  .post("/", userAuth, (req, res, next) => {
    var newPost = new Post({
      postedBy: req.session.userId,
      postTime: req.body.postTime,
      description: req.body.description,
      site: req.body.site,
      comments: [],
      likes: [],
    });

    newPost.save((err, succ) => {
      if (err) return next(err);
      else {
        res.send("Successfuly posted");
      }
    });
  })
  .get("/:postId", (req, res, next) => {
    Post.findById(req.params.postId, (err, result) => {
      if (err) return next(err);
      res.json(result);
    });
  })
  .delete("/:postId", userAuth, (req, res, next) => {
    var post;
    Post.findById(req.params.postId, (err, result) => {
      if (err) return next(err);
      post = result;
      if (post.postedBy.toString() !== req.session.userId)
        return next(new Error("Not admin or poster!"));
      else {
        Post.findByIdAndDelete(req.params.postId, (err, result) => {
          if (err) return next(err);
          else res.send("Successfuly deleted post!");
        });
      }
    });
  })
  .post("/:postId/comment", userAuth, (req, res, next) => {
    var post;
    Post.findById(req.params.postId, (err, result) => {
      if (err) return next(err);
      post = result;
      post.comments.push(
        new Comment({
          body: req.body,
          user: req.session.userId,
        })
      );
      post.save((err, result) => {
        if (err) return next(err);
        res.send("Successfuly created comment!");
      });
    });
  })
  .delete("/:postId/comments/:commentId", userAuth, (req, res, next) => {
    var post;
	Comment.findOneAndRemove({"_id" : req.params.commentId, "user" : req.session.userId}, (err, result) =>{
		if (err) return next(err);
		res.send("Successfuly deleted comment");
	})
  })
  .post("/:postId/like", (req, res, next) => {
    Post.find(
      { _id: req.params.postId, "likes.user": req.body.user },
      (err, result) => {
        if (err) next(err);
        else {
          if (result.length > 0) {
            //if the user has already liked the post, go on to delete the like
            var count = 0;
            for (; count < result[0].likes.length; count++)
              if (result[0].likes[count].user.toString() === req.body.user)
                break;
            result[0].likes.splice(count, 1);
            result[0].save((err, result) => {
              if (err) next(err);
              else res.json(result);
            });
          } else {
            //if the user hasn't liked the post, fetch the post again (bad) and add the like to the post
            Post.findById(req.params.postId, (err, result) => {
              if (err) next(err);
              else {
                result.likes.push(
                  new Like({
                    user: req.body.user,
                  })
                );
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
