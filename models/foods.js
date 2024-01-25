const mongoose = require('mongoose');
const foodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },

    time: {
        type: String,
        required: true
    }, imageUrl: {
        type: String,
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
    foodtype: {
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
    restuarant: {
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
    additive: {
        type: Array,
        default: []

    }

}

);
module.exports = mongoose.model('Foods', foodsSchema)