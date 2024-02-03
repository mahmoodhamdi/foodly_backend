const User = require('../models/user');
const generateOTP = require('../utils/otp_generator');
const cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/smtp_function');


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
            await newUser.save();
            // send email with otp
            sendEmail(newUser.email, otp);
            res.status(200).json({ message: 'User created successfully', success: true });
        }

        catch (error) {
            res.status(500).json({ message: error.message, success: false });

        }
    },
    loginUser: async (req, res) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ message: 'Invalid email', success: false });
        }
        const minPasswordLength = 8;
        if (minPasswordLength > req.body.password) {
            return res.status(400).json({ message: 'Password must be at least 8 characters', success: false });
        }
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'User not found', success: false });
            }
            const decryptedPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
            const decryptedPasswordToString = decryptedPassword.toString(cryptoJs.enc.Utf8);
            if (decryptedPasswordToString !== req.body.password) {
                return res.status(400).json({ message: 'Incorrect password', success: false });
            }

            // if (user.otp !== req.body.otp) {
            //     return res.status(400).json({ message: 'Incorrect OTP', success: false });
            // }
            const userToken = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SEC, { expiresIn: '22d' });
            const { password, otp, ...others } = user._doc;
            res.status(200).json({ message: 'User logged in successfully', user: user, token: userToken, success: true });

        } catch (error) {
            res.status(500).json({ message: error.message, success: false });
        }
    },


}