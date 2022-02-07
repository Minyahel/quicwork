const express = require("express");
const { Each } = require("jade/lib/nodes");
var router = express.Router();
var { Post, Comment, Like } = require("../models/post");
var User = require("../models/user");
/*This router will handle everything related to handling posts
  such as getting all posts, deleting posts as well as creating 
  new posts
*/
router
  .get("/", (req, res, next) => {
    Post.find({}, (err, result) => {
      if (err) next(err);
      else res.json(result);
    });
  })
  .post("/", (req, res, next) => {
    console.log(req.body);

    var newPost = new Post({
      postedBy: req.body.postedBy,
      postTime: req.body.postTime,
      description: req.body.description,
      site: req.body.site,
      comments: [],
      likes: [],
    });

    newPost.save((err, succ) => {
      if (err) next(err);
      else {
        console.log("saved");
        res.send("posted");
      }
    });
  })
  .get("/:postId", (req, res, next) => {
    Post.findById(req.params.postId, (err, result) => {
      if (err) next(err);
      res.json(result);
    });
  })
  .delete("/:postId", (req, res, next) => {
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
          if (!user.admin && post.postedBy.toString() !== req.body.user)
            next(new Error("Not admin or poster!"));
          else {
            Post.findByIdAndDelete(req.params.postId, (err, result) => {
              if (err) next(err);
              else res.send("Successfuly deleted post!");
            });
          }
        });
      }
    });
  })
  .post("/:postId/comment", (req, res, next) => {
    var post;
    Post.findById(req.params.postId, (err, result) => {
      if (err) next(err);
      post = result;
      post.comments.push(
        new Comment({
          body: req.body,
          user: req.user,
        })
      );
      post.save((err, result) => {
        if (err) next(err);
        res.send("Comment created");
      });
    });
  })
  .delete("/:postId/comments/:commentId", (req, res, next) => {
    res.send(
      "deleting comment " +
        req.params.commentId +
        " from post " +
        req.params.postId
    );
  })
  .post("/:postId/like", (req, res, next) => {
    //first find the post, then check if the user has already liked the post, if not push a new like to the list
    //will need the userid through body
    Post.find(
      { _id: req.params.postId, "likes.user": req.body.user },
      (err, result) => {
        if (err) next(err);
        // console.log(result[0].likes.length);
        else {
          if (result.length > 0) {
            var count = 0;
            for (; count < result[0].likes.length; count++)
              if (result[0].likes[count].user.toString() === req.body.user) break;
            result[0].likes.splice(count, 1);
            result[0].save((err, result) => {
              if (err) next(err);
              else res.json(result);
            });
          } else {
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
            })
          }
        }
        // if (err) next(err);
        // else {
        //     result.find({ 'likes.user' : req.body.user}, (err, result) => {
        //         if (err) next (err);
        //         else res.json(result);
        //         // else {
        //         //     result.likes.push(new Like({
        //         //         "user": req.body.user
        //         //     }))
        //         //     result.save((err, result) => {
        //         //         if (err) next(err);
        //         //         else res.json(result);
        //         //     })
        //         // }
        //     })
        // }
      }
    );
  });

module.exports = router;
