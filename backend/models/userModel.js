// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;