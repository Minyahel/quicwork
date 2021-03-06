const mongoose = require('mongoose'); // use const because you are not going to change it later on
require('mongoose-type-email'); //get a new schema for emails
var bcrypt = require('bcrypt');
const customException = require('../util/customException');
var SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        default: '',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//add a middleware that is run right before a save function is called on a user object
//this middleware changes the user.password to the hash before saving
UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(customException(500, 'Server Error', err));

        user.password = hash;

        next();
    });
});

/*we are writing a custom method for our userschema here that we can use
  to compare a new password to a new one as we know how bcrypt works
*/
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        if (isMatch) return cb(err, isMatch);
        //return no error if isMatch (true)
        else return cb(true); //returning a bogus value of true to show that there is an error
        //and that passwords are not the same
    });
};

module.exports = mongoose.model('User', UserSchema);
