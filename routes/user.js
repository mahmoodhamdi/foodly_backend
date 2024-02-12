const router = require('express').Router();
const {verifyAndAuthorization}=require("../middleware/verifyToken")
const userController = require('../controllers/userController');
router.get('/', verifyAndAuthorization, userController.getUser);
router.delete('/delete', verifyAndAuthorization, userController.deleteUser);
router.get('/verify/:otp', verifyAndAuthorization, userController.verifyAccount);
router.get('/verify-phone/:phone', verifyAndAuthorization, userController.verifyPhone);
module.exports = router
