const router = require('express').Router();
const { verifyAndAuthorization } = require("../middleware/verifyToken")
const restaurantController = require('../controllers/restaurantController');
router.post('/add', verifyAndAuthorization, restaurantController.addRestaurant);
router.get('/all/:code', restaurantController.getAllNearbyRestaurants);
router.get('/:code', restaurantController.getRandomRestaurants);
router.get('/by/:id', restaurantController.getRestaurantById);
module.exports = router
