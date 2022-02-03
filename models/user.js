const mongoose = require('mongoose'); // use const because you are not going to change it later on
require('mongoose-type-email'); //get a new ti


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        default: '',
        required: true
    }
})

module.exports = mongoose.model('User', user);
