const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
router.post('/create', categoryController.CreateCategory);
router.get('/all', categoryController.GetAllCategories);
router.get('/random', categoryController.GetRandomCategories);
module.exports = router
    