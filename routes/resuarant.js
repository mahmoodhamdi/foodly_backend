const router = require('express').Router();
const restaurantController = require('../controllers/restuarantController');
router.post('/add', restaurantController.addRestaurant);
router.get('/all/:code', restaurantController.getAllNearbyRestaurants);
router.get('/:code', restaurantController.getRandomRestaurants);
router.get('/by/:id', restaurantController.getRestaurantById);
module.exports = router
