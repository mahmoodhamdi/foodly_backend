const router = require('express').Router();
const foodController = require('../controllers/foodController');
router.post('/add', foodController.addFood);
router.get('/:id', foodController.getFoodById);
router.get('/:restaurantId', foodController.getFoodsByRestaurant);
router.get('/:category/:code', foodController.getFoodsByCategoryAndCode);
router.get('/random/:code', foodController.getRandomFoods);
router.get('/search/:search', foodController.searchFoods);
router.get('/recommendation/:code', foodController.getRandomFoods);
module.exports = router
