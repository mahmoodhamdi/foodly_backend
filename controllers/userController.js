const { verify } = require('jsonwebtoken');
const User = require('../models/user');
module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, __v, createdAt, ...userData } = user._doc;
            res.status(200).json({ message: 'User fetched successfully', user: userData, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    },
    verifyAccount: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'User not found', success: false });
            }
            if (user.otp !== req.body.otp) {
                return res.status(400).json({ message: 'Incorrect OTP', success: false });
            }
            user.verification = true;
            user.otp = "none";
            await user.save();
            const { password, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ message: 'Account has been verified successfully', user: others, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    },
    verifyPhone: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'User not found', success: false });
            }
            if (user.otp !== req.body.otp) {
                return res.status(400).json({ message: 'Incorrect OTP', success: false });
            }
            user.phoneVerification = true;
            user.phone = phone;
            await user.save();
            const { password, __v, createdAt, ...others } = user._doc;
            res.status(200).json({ message: 'Phone has been verified successfully', user: others, success: true });
        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    }
};