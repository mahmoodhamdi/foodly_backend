const router = require('express').Router();
const foodController = require('../controllers/foodController');
router.post('/', foodController.addFood);
router.get('/:id', foodController.getFoodById);
router.get('/restuarant-foods/:id', foodController.getFoodsByRestuarant);
router.get('/:category/:code', foodController.getFoodsByCategoryAndCode);
router.get('/random/:code', foodController.getRandomFoods);
router.get('/search/:search', foodController.searchFoods);
router.get('/recommendtion:code', foodController.getRandomFoods);
module.exports = router
