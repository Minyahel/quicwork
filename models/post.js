const mongoose = require('mongoose');
var UserSchema = require('./user');

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
})

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
    comments: [
        CommentSchema
    ],
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                refs: 'users'
            },
            createdAt: Date
        }
    ]
})

//middle ware that will run before a post object is
PostSchema.pre('save', function (next) {
    var post = this;

    UserSchema.findById(post.postedBy, (err, result) => {
        if (err) next (err);
        else {
            post.user = result.username
            next();
        }
    })

} )

const Post = mongoose.model('Post', PostSchema);
const Comment  = mongoose.model('Comment', CommentSchema);

module.exports = {
    Post: Post,
    Comment: Comment
}