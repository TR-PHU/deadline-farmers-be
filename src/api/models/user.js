const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        phone: {
            type: Number,
        },
        address: {
            type: String,
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
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        role: {
            type: Boolean,
            default: false,
        },
        fullname: {
            type: String,
            minlength: 5,
            require: true,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true },
    { collection: 'users' }
);

module.exports = mongoose.model('users', UserSchema);
