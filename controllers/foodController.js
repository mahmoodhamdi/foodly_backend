const { $where } = require('../models/food');

Food = require('../models/food');
module.exports = {
    addFood: async (req, res) => {
        const { title, foodTags, foodType, code, category, restaurant, description, time, additives, price, imageUrl } = req.body;
        if (!title || !foodTags || !foodType || !code || !category || !restaurant || !description || !time || !additives || !price || !imageUrl) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }
        try {
            const newFood = new Food(req.body);

            await newFood.save();
            res.status(201).json({ message: 'Food created successfully', success: true });

        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getFoodById: async (req, res) => {
        const foodId = req.params.id;
        try {
            const food = await Food.findOne({ _id: foodId }, { __v: 0 });
            res.status(200).json({ message: 'Food fetched successfully', food: food, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getNearbyFoods: async (req, res) => {
        const code = req.params.code;
        try {
            let foods;
            if (code) {

                foods = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $match: { project: { __v: 0 } } },
                    { $sample: { size: 10 } }
                ]);
            }
            if (foods.length === 0) {

                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $match: { project: { __v: 0 } } },
                    { $sample: { size: 10 } }
                ]);

            }
            res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });

        } catch (err) {

        }
    },
    getRecommendedFoods: async (req, res) => {

        try {
            let foods = [];
            if (req.params.code) {

                foods = await Food.aggregate([
                    { $match: { code: req.params.code } },
                    { $sample: { size: 5 } },
                    { $match: { project: { __v: 0 } } }

                ]);
            }
            if (!foods.length) {

                foods = await Food.aggregate([
                    { $match: { project: { __v: 0 } } },
                    { $sample: { size: 10 } }
                ]);

            }
            if (foods.length) {
                res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });
            } else {
                res.status(404).json({ message: "No food found", success: false });
            }

        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },


    //Restaurant Menu
    getFoodsByRestaurant: async (req, res) => {
        const id = req.params.id;
        try {
            const foods = await Food.find({ restaurant: id }, { __v: 0 });
            res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            const foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $match: { project: { __v: 0 } } }
            ]);
            if (foods.length === 0) {
                return res.status(404).json({ message: "No food found", success: false })
            }
            res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }

    },
    searchFoods: async (req, res) => {
        const { query } = req.body;
        try {
            const foods = await Food.aggregate([
                { $search: { index: "foods", text: { query: query, path: { wildcard: "*" } } } },
            ]);
            res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    getFoodsByCategoryAndCode: async (req, res) => {
        const { category, code } = req.params;
        try {
            let foods;
            foods = await Food.aggregate([
                { $match: { category: category, code: code, isAvailable: true } },
                { $sample: { size: 10 } },
                { $match: { project: { __v: 0 } } }
            ]);

            if (foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 10 } },
                ]);



            }
            else if (foods || foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 10 } },
                ]);

            }
            res.status(200).json({ message: 'Foods fetched successfully', foods: foods, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }

    },

}
