const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minlength: 5,
        required: true
    },
    phone: {
        type: number,
        required: true,
    }, 
    address: {
        type: String,
        required: true
    },
    username: {
        type: String,
        minlength: 5,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }, {collection: 'users'});


module.exports = mongoose.model('users', UserSchema);