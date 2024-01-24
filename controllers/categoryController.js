const Category = require('../models/category');
module.exports = {
    CreateCategory: async (req, res) => {
        const newCategory = new Category(req.body);
        try {
            await newCategory.save();
            res.status(201).json({ message: 'Category created successfully', data: newCategory, success: true });

        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    GetAllCategories: async (req, res) => {
        try {
            const categories = await Category.find({ title: { $ne: 'More' } }, { __v: 0 });
            res.status(200).json({ message: 'Categories fetched successfully', data: categories, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    GetRandomCategories: async (req, res) => {
        try {
            let categories = await Category.aggregate([
                { $match: { value: { $ne: 'more' } } },
                { $sample: { size: 4 } },

            ]);
            const moreCategory = await Category.findOne({ value: 'more' }, { __v: 0 });
            if (moreCategory) {
                categories.push(moreCategory);
            }
            res.status(200).json({ message: 'Categories fetched successfully', data: categories, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }
}