const router = require('express').Router();
const foodsController = require('../controllers/foodController');
router.post('/add', foodController.addRestuarant);
router.get('/all/:code', restuarantController.GetAllNearbyRestuarants);
router.get('/:code', restuarantController.GetRandomRestuarants);
router.get('/by/:id', restuarantController.GetRestaurantById);
module.exports = router
