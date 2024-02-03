const router = require('express').Router();
const userController = require('../controllers/userController');
router.get('/', userController.getUser);
router.delete('/delete', userController.deleteUser);
router.get('/verify/:otp', userController.verifyAccount);
router.get('/verify-phone/:phone', userController.verifyPhone);
module.exports = router
