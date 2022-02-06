const mongoose = require('mongoose'); // use const because you are not going to change it later on
require('mongoose-type-email'); //get a new schema for emails
var bcrypt = require('bcrypt');
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
    }
})

//add a middleware that is run right before a save function is called on a user object
//this middleware changes the user.password to the hash before saving 
UserSchema.pre('save',function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
})

/*we are writing a custom method for our userschema here that we can use
  to compare a new password to a new one as we know how bcrypt works
*/
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('User', UserSchema);
