const Restaurant = require('../models/restuarant');
module.exports = {
    addRestaurant: async (req, res) => {
        const { title, imageUrl, coords, time, code, owner, logoUrl } = req.body;
        if (!title || !time || !logoUrl || !code || !owner || !imageUrl || !coords) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        const newRestaurant = new Restaurant(req.body);
        try {
            await newRestaurant.save();
            res.status(201).json({ message: 'Restaurant created successfully', success: true });

        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getRandomRestaurants: async (req, res) => {
        const code = req.params.code;
        let randomRestaurants = [];

        try {
            if (code) {
                randomRestaurants = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },

                    {
                        $sample: {
                            size: 5
                        }
                    },

                    { $match: { project: { __v: 0 } } },
                ]);
            }
            if (randomRestaurants.length === 0) {
                randomRestaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 10 } }

                ]);

            }



            res.status(200).json({ message: 'Restaurants fetched successfully', randomRestaurants: randomRestaurants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }, getRestaurantById: async (req, res) => {
        const restaurantId = req.params.id;
        try {
            const restaurant = await Restaurant.findOne({ _id: restaurantId }, { __v: 0 });
            res.status(200).json({ message: 'Restaurants fetched successfully', categories: restaurant, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getAllNearbyRestaurants: async (req, res) => {
        const code = req.params.code;

        try {
            let allRestaurants = [];
            if (code) {
                allRestaurants = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $match: { project: { __v: 0 } } },
                ]);
            }
            if (allRestaurants.length === 0) {
                allRestaurants = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                ]);

            }



            res.status(200).json({ message: 'Restaurants fetched successfully', restaurants: allRestaurants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }
}