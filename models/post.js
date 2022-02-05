const mongoose = require('mongoose');
var UserSchema = require('./user');

var PostSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Post', PostSchema);