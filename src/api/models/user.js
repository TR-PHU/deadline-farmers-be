const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
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
    },
    { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
