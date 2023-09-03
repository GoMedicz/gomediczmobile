const express = require('express');

var multer  = require('multer')
const router  = express.Router();
const {General, categoryController, ProductController, StoreController, UserController  } = require('../controllers/index');



//Category controller
router.post('/api/pharmacy/category/add_new', General.AuthenticateToken, categoryController.addNewCategory);

router.get('/api/pharmacy/display_category/:pharmacy_code', General.AuthenticateToken, categoryController.getCategory);

router.get('/api', categoryController.greetings);


//General controller
//This is for development purpose only, please comment it out before deployment
router.post('/api/generate_token', General.getJWTToken);


//Products Controller


router.post('/api/pharmacy/product/add_new',  General.AuthenticateToken,General.uploadProductImage,  ProductController.AddNewProduct);


router.get('/api/pharmacy/display_products/:pharmacy_code', General.AuthenticateToken, ProductController.getProducts);

router.get('/api/pharmacy/product/view/:pharmacy_code/:code', General.AuthenticateToken, ProductController.getOneProduct);


router.post('/api/pharmacy/product/update', General.AuthenticateToken, ProductController.UpdateProduct);



//Store Controller
router.post('/api/pharmacy/store/add_new', General.AuthenticateToken, StoreController.addNewStore);

router.get('/api/pharmacy/display_store/:code', General.AuthenticateToken, StoreController.getOneStore);

router.get('/api/pharmacy/all_stores', General.AuthenticateToken, StoreController.getStores);

router.post('/api/pharmacy/store/update', General.AuthenticateToken, StoreController.UpdateStore);



 

//User Controller
router.post('/api/user/add_new', General.AuthenticateToken, UserController.AddNewUser);
router.post('/api/login_vendor', General.AuthenticateToken, UserController.loginUser);


module.exports = router;