const router = require('express').Router();
const restuarantController = require('../controllers/restuarantController');
router.post('/add', restuarantController.addRestuarant);
router.get('/all/:code', restuarantController.GetAllNearbyRestuarants);
router.get('/:code', restuarantController.GetRandomRestuarants);
router.get('/by/:id', restuarantController.GetRestaurantById);
module.exports = router
