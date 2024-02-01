const e = require('express');
const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    value: {
        type: String,
        default: "Restaurant",
    },
    imageUrl: {
        type: String,
        required: true

    },
    foods: {
        type: Array,
        default: []

    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    }
    ,
    isAvailable: {
        type: Boolean,
        default: true
    },
    owner: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    logoUrl: {
        type: String,
        required: true
    }
    ,
    rating: {
        type: Number,
        min: 0, max: 5, default: 3,
    },
    ratingCount: {
        type: String,
        default: "267"
    },
    verification: {
        type: String,
        default: "Pending",
        enm: ["Pending", "Verified", "Rejected"],

    }
    ,

    verificationMessage: {
        type: String,
        default: "You can verify your restaurant by clicking on the link sent to your email",
    },
    coords: {
        id: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        latitudeDelta: {
            type: Number,
            default: 0.004,
        },
        longitudeDelta: {
            type: Number,
            default: 0.004,
        },
        address: { type: String, required: true },
        title: { type: String, required: true },


    }

});
module.exports = mongoose.model('Restaurant', restaurantSchema)