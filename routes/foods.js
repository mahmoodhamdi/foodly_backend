const router = require('express').Router();
const foodsController = require('../controllers/foodsController');
router.post('/add', restuarantController.addRestuarant);
router.get('/all/:code', restuarantController.GetAllNearbyRestuarants);
router.get('/:code', restuarantController.GetRandomRestuarants);
router.get('/by/:id', restuarantController.GetRestaurantById);
module.exports = router
