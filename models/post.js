const mongoose = require('mongoose');
var UserSchema = require('./user');

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
        {
            body: String,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                refs: 'users'
            },
            createdAt: Date
        }
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

module.exports = mongoose.model('Post', PostSchema);