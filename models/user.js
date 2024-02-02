const mongoose = require('mongoose');
const { use } = require('../routes/rating');
const e = require('express');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    otp: {
        type: String,
        required: false,
        default: "none"

    }
    ,
    verification: {
        type: Boolean,
        default: false

    },
    phone: {
        type: String,
        required: false
        ,
        default: "0123456789"

    },
    phoneVerification: {
        type: Boolean,
        default: false

    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: false

    },
    userType: {
        type: String,
        required: true
        ,
        default: "User",
        enum: ['User', 'Admin', 'Vendor', 'Delivery'],
    },
    profile: {
        type: String,
        required: false,
        default: "https://avatars.githubusercontent.com/u/148990144?v=4&size=40.png",
    }





}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);