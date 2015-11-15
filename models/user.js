//require the moongose object
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//create a schema for the the business contact list
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'Password is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required'
    } 

},  {
    collection: 'user'
});

//Generate a Hash
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//check to see if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// make this file public
module.exports = mongoose.model('User', userSchema);