const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
const { verifyAndAuthorization } = require("../middleware/verifyToken")

router.post('/add', verifyAndAuthorization, ratingController.addRating);
router.get('/check', verifyAndAuthorization, ratingController.checkUserRating);
module.exports = router
