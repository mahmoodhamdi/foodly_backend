const Restuarant = require('../models/foods');
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
        let randomRestuarants = [];

        try {
            if (code) {
                randomRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isAvailable: true } },

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
                    { $match: { isAvailable: true } },
                    { $sample: { size: 10 } }

                ]);

            }



            res.status(200).json({ message: 'Restuarants fetched successfully', randomRestuarants: randomRestuarants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }, GetRestaurantById: async (req, res) => {
        const restuarantId = req.params.id;
        try {
            const restuarant = await Restuarant.findOne({ _id: restuarantId }, { __v: 0 });
            res.status(200).json({ message: 'Restuarants fetched successfully', categories: restuarant, success: true });
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
                    { $match: { code: code, isAvailable: true } },
                    { $match: { project: { __v: 0 } } },
                ]);
            }
            if (allRestuarants.length === 0) {
                allRestuarants = await Restuarant.aggregate([
                    { $match: { code: code, isAvailable: true } },
                ]);

            }



            res.status(200).json({ message: 'Restuarants fetched successfully', restuarants: allRestuarants, success: true });
        } catch (err) {
            res.status(500).json({ message: err.message, success: false });
        }
    }
}