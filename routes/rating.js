const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
router.post('/add', ratingController.addRating);
router.get('/check', ratingController.checkUserRating);
module.exports = router
