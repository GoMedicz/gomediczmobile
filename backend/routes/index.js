const express = require('express');
var fs = require('fs');
var multer  = require('multer')
//const upload = multer();
const router  = express.Router();
const {General, categoryController, ProductController, StoreController, UserController, DoctorController, PaymentController, WithdrawalController, OrderController  } = require('../controllers/index');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, './public/images/vendors/products/')

    },
    filename: function (req, file, cb) {
   
      cb(null, req.body.code+'_'+file.originalname)

    }
  })
  var store = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, './public/images/vendors/profiles/')

    },
    filename: function (req, file, cb) {
   
      cb(null, req.body.code+'_'+file.originalname)

    }
  })

var prescription = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './public/images/vendors/prescription/')

  },
  filename: function (req, file, cb) {
 
    cb(null, req.body.code+'.png')

  }
})

const prescribe = multer({ storage: prescription });
const profile = multer({ storage: store });
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

router.post('/api/vendor/profile/update', General.AuthenticateToken, profile.single('image'), StoreController.UpdateStore);


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



//withdrawal controller
router.post('/api/account/withdrawal', General.AuthenticateToken, WithdrawalController.AddNewWithdrawal);


router.get('/api/vendor/withdrawal/:wallet', General.AuthenticateToken, WithdrawalController.getTransactions);


router.post('/api/vendor/earnings', General.AuthenticateToken, WithdrawalController.getEarnings);


//Order controller
router.post('/api/user/order/create', General.AuthenticateToken, OrderController.AddNewOrder);

router.get('/api/vendor/transaction/:code', General.AuthenticateToken, OrderController.getTransactions);

router.get('/api/vendor/order/:vendor/:code', General.AuthenticateToken, OrderController.getOrder);


router.post('/api/vendor/order/prescription', General.AuthenticateToken, prescribe.single('image'), OrderController.UploadFile);


router.post('/api/vendor/statistics', General.AuthenticateToken, OrderController.getStatistics);
router.post('/api/vendor/order/update', General.AuthenticateToken, OrderController.UpdateField);



//Doctors' Controller
router.post('/api/doctor/verification', DoctorController.VerifyVendor);

module.exports = router;