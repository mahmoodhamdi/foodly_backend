const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },

    time: {
        type: String,
        required: true
    }, imageUrl: {
        type: Array,
        required: true
    },
    foodTags: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    foodType: {
        type: Array,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    rating: {
        type: Number,
        default: 3, min: 1, max: 5
    },
    ratingCount: {
        type: String,
        default: "276",
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    additives: {
        type: Array,
        default: []

    }

}

);
module.exports = mongoose.model('Food', foodSchema)