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
<<<<<<< HEAD
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
=======
    { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
>>>>>>> c17d5d95871156150ade6f04a9690878ee256365
