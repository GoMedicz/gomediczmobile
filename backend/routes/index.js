const express = require('express');
var fs = require('fs');
var multer  = require('multer')
//const upload = multer();
const router  = express.Router();
const {General, categoryController, ProductController, StoreController, UserController, DoctorController, PaymentController, DepositController  } = require('../controllers/index');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, './public/images/products/')

    },
    filename: function (req, file, cb) {
   
      cb(null, req.body.code+'_'+file.originalname)

    }
  })
  const upload = multer({ storage: storage });

//Category controller
router.post('/api/pharmacy/category/add_new', General.AuthenticateToken, categoryController.addNewCategory);

router.get('/api/vendor/products/category/all', General.AuthenticateToken, categoryController.getCategory);

router.get('/api', categoryController.greetings);


//General controller
//This is for development purpose only, please comment it out before deployment
router.post('/api/generate_token', General.getJWTToken);


//Products Controller
router.post('/api/vendor/product/add',  General.AuthenticateToken, upload.single('image'),  ProductController.AddNewProduct);


router.get('/api/vendor/product/view/:pharmacy_code/:code', General.AuthenticateToken, ProductController.getOneProduct);

router.post('/api/vendor/product/update', General.AuthenticateToken, upload.single('image'), ProductController.UpdateProduct);


router.get('/api/vendor/products/all/:code', General.AuthenticateToken, ProductController.getProducts);



//Store Controller

router.get('/api/pharmacy/all_stores', General.AuthenticateToken, StoreController.getStores);

router.post('/api/pharmacy/store/update', General.AuthenticateToken, StoreController.UpdateStore);


router.post('/api/vendor/verification', StoreController.VerifyVendor);
router.post('/api/vendor/login', StoreController.loginVendor);
router.post('/api/vendor/registration', StoreController.addNewStore);

router.get('/api/vendor/display_one/:code', General.AuthenticateToken, StoreController.getOneStore);


//User Controller
router.post('/api/user/add_new', General.AuthenticateToken, UserController.AddNewUser);


router.post('/api/login_vendor', General.AuthenticateToken, UserController.loginUser);



//Payment controller
router.post('/api/payment/add', General.AuthenticateToken, PaymentController.AddNewPayment);
router.get('/api/payment/transactions/:wallet', General.AuthenticateToken, PaymentController.getTransactions);

router.get('/api/vendor/account/:wallet', General.AuthenticateToken, PaymentController.getBalance);



//Deposit controller
router.post('/api/deposit/add', General.AuthenticateToken, DepositController.AddNewDeposit);
router.get('/api/deposit/transactions/:wallet', General.AuthenticateToken, DepositController.getTransactions);



//Doctors' Controller
router.post('/api/doctor/verification', DoctorController.getDoctorByPhone);
router.post('/api/doctor/verification', DoctorController.getDoctorByPhone);

module.exports = router;