const router = require('express').Router();
const foodController = require('../controllers/foodController');
router.post('/add', foodController.addFood);
router.get('/by/:id', foodController.getFoodById);
router.get('/restaurant-foods/:restaurantId', foodController.getFoodsByRestaurant);
router.get('/:category/:code', foodController.getFoodsByCategoryAndCode);
router.get('/random/:code', foodController.getNearbyFoods);
router.get('/search/:search', foodController.searchFoods);
router.get('/recommendation/:code', foodController.getRecommendedFoods);
module.exports = router
