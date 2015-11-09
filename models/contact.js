//require the moongose object
var mongoose = require('mongoose');

//create a schema for the the business contact list
var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Contact name is required'
    },
    number: {
        type: String,
        default: '',
        trim: true,
        required: 'Contact number is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email Address is required'
    }
});

// make this file public
module.exports = mongoose.model('Contact', contactSchema);