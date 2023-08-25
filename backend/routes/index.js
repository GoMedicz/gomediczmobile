const express = require('express');
const router  = express.Router();
const categoryController = require('../controllers/category.controller');
const ProductController = require('../controllers/products.controller');

const General = require('../controllers/general.controller');


//Category controller
router.post('/api/pharmacy/category/add_new', General.AuthenticateToken, categoryController.addNewCategory);

router.get('/api/pharmacy/display_category/:pharmacy_code', General.AuthenticateToken, categoryController.getCategory);

router.get('/api', categoryController.greetings);


//General controller
//This is for development purpose only, please comment it out before deployment
router.post('/api/generate_token', General.getJWTToken);



//Products Controller
router.post('/api/pharmacy/product/add_new', General.AuthenticateToken, ProductController.AddNewProduct);











module.exports = router;