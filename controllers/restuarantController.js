const restuarant = require('../models/restuarant');
const Restuarant = require('../models/restuarant');
module.exports = {
    addRestuarant: async (req, res) => {
        const { title, value, imageUrl, coords, foods, pickup, delivery } = req.body;
        if (!title || !value || !imageUrl || !coords || !foods || !pickup || !delivery || !coords.latitude || !coords.longitude) {
            return res.status(400).json({ message: 'All fields are required', success: false });

        }
        const newRestuarant = new Restuarant(req.body);
        try {
            await newRestuarant.save();
            res.status(201).json({ message: 'Restuarant created successfully', success: true });

        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    GetRandomRestuarants: async (req, res) => {
        const code = req.params.code;

        try {
            let randomRestuarants = [];
            if (code) {
                randomRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isavailable: true } },

                    {
                        $sample: {
                            size: 5
                        }
                    },

                    { $match: { project: { __v: 0 } } },
                ]);
            }
            if (randomRestuarants.length === 0) {
                randomRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isavailable: true } },
                ]);

            }



            res.status(200).json({ message: 'Restuarants fetched successfully', restuarants: randomRestuarants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }, GetRestaurantById: async (req, res) => {
        const restuarantId = req.params.id;
        try {
            const restuarant = await Restuarant.findOne({ _id: restuarantId }, { __v: 0 });
            res.status(200).json({ message: 'Restuarants fetched successfully', categories: categories, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    },
    GetAllNearbyRestuarants: async (req, res) => {
        const code = req.params.code;

        try {
            let allRestuarants = [];
            if (code) {
                allRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isavailable: true } },



                    { $match: { project: { __v: 0 } } },
                ]);
            }
            if (allRestuarants.length === 0) {
                allRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isavailable: true } },
                ]);

            }



            res.status(200).json({ message: 'Restuarants fetched successfully', restuarants: allRestuarants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }
}