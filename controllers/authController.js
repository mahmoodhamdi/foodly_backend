const User = require('../models/user');
const generateOtp = require('../utils/generateOtp');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');



module.exports = {
    createUser: async (req, res) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ message: 'Invalid email', success: false });
        }
        const minPasswordLength = 8;
        if (minPasswordLength > req.body.password) {
            return res.status(400).json({ message: 'Password must be at least 8 characters', success: false });
        }

        try {
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists', success: false });
            }

            const otp = generateOtp();
            const newUser = new User({
                username: req.body.username,
                userType: "Client",
                email: req.body.email,
                password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
                phone: req.body.phone,
                otp: otp
            });
            const savedUser = await newUser.save();
            res.status(200).json({ message: 'User created successfully', user: savedUser, success: true });
        }

        catch (error) {
            res.status(500).json({ message: error.message, success: false });

        }
    },
    loginUser: async (req, res) => {

    },


}