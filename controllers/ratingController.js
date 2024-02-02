const Rating = require("../models/rating");
const Restaurant = require("../models/restaurant");
const Food = require("../models/food");
module.exports = {
    addRating: async (req, res) => {
        const newRating = new Rating({
            userId: req.body.userId,
            ratingType: req.body.ratingType,
            product: req.body.product,
            rating: req.body.rating,
        });
        try {
            await newRating.save();
            if (req.body.ratingType === "Restaurant") {
                const restaurants = await Restaurant.aggregate([
                    {
                        $match: {
                            product: req.body.product,
                            ratingType: req.body.ratingType,
                        },
                    },
                    {
                        $group: {
                            _id: "$product",
                            averageRating: { $avg: "$rating" },
                        },
                    },
                ]);
                if (restaurants.length > 0) {
                    const averageRating = restaurants[0].averageRating;
                    await Restaurant.findOneAndUpdate(
                        { product: req.body.product },
                        { averageRating: averageRating },
                        { new: true }
                    );
                }
            }
            else if (req.body.ratingType === "Food") {
                const foods = await Food.aggregate([
                    {
                        $match: {
                            product: req.body.product,
                            ratingType: req.body.ratingType,
                        },
                    },
                    {
                        $group: {
                            _id: "$product",
                            averageRating: { $avg: "$rating" },
                        },
                    },
                ]);
                if (foods.length > 0) {
                    const averageRating = foods[0].averageRating;
                    await Food.findOneAndUpdate(
                        { product: req.body.product },
                        { averageRating: averageRating },
                        { new: true }
                    );
                }
            }
            res.status(201).json({ message: 'Rating created successfully', rating: newRating, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
};
