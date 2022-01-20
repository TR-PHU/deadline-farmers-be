const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetTokenSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        resetToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('resettokens', ResetTokenSchema);
