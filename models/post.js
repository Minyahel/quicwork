const mongoose = require('mongoose');
var UserSchema = require('./user');
const customException = require('../util/customException');

//sub schemas created since it was found to be necessary
var CommentSchema = new mongoose.Schema({
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users'
    }
});

var PostSchema = new mongoose.Schema({
    user: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    site: {
        type: String
    },
    comments: [CommentSchema],
    likes: [LikeSchema]
});

//middle ware that will run before a post object is
PostSchema.pre('save', function (next) {
    var post = this;

    UserSchema.findById(post.postedBy, (err, result) => {
        if (err) return next(customException(500, "Couldn't Find User", err));
        else {
            post.user = result.username;
            next();
        }
    });
});

//middleware for deleting comment, requires the index of the comment to be deleted
//inside the array of comments in the post and callback function cb which is called
// once deletion has been completed
PostSchema.methods.deleteComment = function (index, cb) {
    var post = this;

    post.comments.splice(index, 1);
    post.save((err, result) => {
        if (err) return cb(customException(500, "Couldn't Save Post", err));
        return cb(null, true);
    });
};

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);
const Like = mongoose.model('Like', LikeSchema);

module.exports = {
    Post: Post,
    Comment: Comment,
    Like: Like
};
