const express = require('express');
var fs = require('fs');
var multer  = require('multer')
//const upload = multer();
const router  = express.Router();
const {
  General, 
  categoryController, 
  ProductController, 
  StoreController, 
  UserController, 
  DoctorController, 
  PaymentController, 
  WithdrawalController, 
  OrderController, 
  RiderController,
  SpecialityController,
  ReviewController,
  AppointmentController,
  HospitalController,
  DepartmentDoctorController,
  LabController,
  LabTestController,
  MainCategoryController,
  ReminderController,
  OfferController,
  CreditController,
  AddressController   
} = require('../controllers/index');

var ride = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, './public/images/riders/')

  },
  filename: function (req, file, cb) {
 
    cb(null, req.body.code+'_'+file.originalname)

  }
})


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


  var userimage = multer.diskStorage({
    destination: function (req, file, cb) {

      cb(null, './public/images/user/')

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
  },
})

var appointment = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/doctors/appointment/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.image_url)
  },
})

var labPic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/lab/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.image_url)
  },
})


var categoryUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/pharmacy/category/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.image_url)
  },
})


const prescribe = multer({ storage: prescription });
const profile = multer({ storage:store });
  const upload = multer({ storage: storage });
  const rider = multer({ storage:ride });
  const attachment = multer({ storage:appointment });
  const user = multer({ storage:userimage });
  const lab = multer({ storage:labPic });
  const category = multer({ storage: categoryUpload });


//MainCategory controller
router.post('/api/store/category/add', General.AuthenticateToken, category.single('image'), MainCategoryController.addNewCategory);

router.post('/api/store/subcategory/add', General.AuthenticateToken, MainCategoryController.addNewSubCategory);

router.get('/api/store/sub_category/all', General.AuthenticateToken, MainCategoryController.getSubCategory);

router.get('/api/store/category/all', General.AuthenticateToken, MainCategoryController.getCategory);




//Category controller
router.post('/api/pharmacy/category/add_new', General.AuthenticateToken, categoryController.addNewCategory);

router.get('/api/vendor/products/category/all', General.AuthenticateToken, categoryController.getCategory);



//General controller
//This is for development purpose only, please comment it out before deployment
router.post('/api/generate_token', General.getJWTToken);


//Products Controller
router.post('/api/vendor/product/add',  General.AuthenticateToken, upload.single('image'),  ProductController.AddNewProduct);


router.get('/api/vendor/product/view/:pharmacy_code/:code', General.AuthenticateToken, ProductController.getOneProduct);

router.post('/api/vendor/product/update', General.AuthenticateToken, upload.single('image'), ProductController.UpdateProduct);

router.get('/api/user/products/:code', General.AuthenticateToken, ProductController.getProductByCategory);

router.get('/api/user/search_products/:title', General.AuthenticateToken, ProductController.searchProductByName);

router.get('/api/users/drugs/all', General.AuthenticateToken, ProductController.getAllProducts);


router.get('/api/vendor/products/all/:code', General.AuthenticateToken, ProductController.getProducts);

router.get('/api/vendor/product/details/:code', General.AuthenticateToken, ProductController.searchOneProduct);


//Store Controller

router.get('/api/pharmacy/all_stores', General.AuthenticateToken, StoreController.getStores);

router.post('/api/vendor/profile/update', General.AuthenticateToken, profile.single('image'), StoreController.UpdateStore);


router.post('/api/vendor/verification', StoreController.VerifyVendor);
router.post('/api/vendor/login', StoreController.loginVendor);
router.post('/api/vendor/registration', StoreController.addNewStore);

router.get('/api/vendor/display_one/:code', General.AuthenticateToken, StoreController.getOneStore);




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
router.get('/api/user/order/:code', General.AuthenticateToken, OrderController.getUserOrder);

router.get('/api/transaction/getorder/:code', General.AuthenticateToken, OrderController.getAllUserOrder)

router.post('/api/vendor/order/prescription', General.AuthenticateToken, prescribe.single('image'), OrderController.UploadFile);


router.post('/api/vendor/statistics', General.AuthenticateToken, OrderController.getStatistics);
router.post('/api/vendor/order/update', General.AuthenticateToken, OrderController.UpdateField);

router.get('/api/transaction/user/:code', General.AuthenticateToken, OrderController.getUserTransaction)




//Doctors' Controller
router.post('/api/doctor/verification', DoctorController.VerifyVendor);
router.post('/api/doctor/registration', DoctorController.AddNewDoctor);
router.post('/api/doctor/update', DoctorController.UpdateDoctor);
router.get('/api/doctor/search/:title', DoctorController.searchDoctor);
router.get('/api/doctor/profile/:code', DoctorController.getDoctorProfile);
router.get('/api/doctors/all', DoctorController.getDoctors);

//Speciality controller
router.post('/api/speciality/add', SpecialityController.addNewSpeciality);
router.get('/api/doctor/speciality', SpecialityController.getSpeciality);



//Rider's Controller

router.post('/api/rider/verification', RiderController.VerifyRider);
router.post('/api/rider/login', RiderController.loginRider);
router.post('/api/rider/registration', RiderController.AddNewRider);
router.post('/api/rider/profile/update', General.AuthenticateToken, rider.single('image'), RiderController.UpdateRider);

router.get('/api/rider/display_one/:code', General.AuthenticateToken, RiderController.getRiderProfile);
router.get('/api/rider/summary/:code', General.AuthenticateToken, RiderController.getSummary);


router.post('/api/rider/field/update', General.AuthenticateToken, RiderController.UpdateField);







//user controller



router.post('/api/user/verification', UserController.VerifyUser);
router.post('/api/user/login', UserController.loginUser);
router.post('/api/user/registration', UserController.AddNewUser);
router.post('/api/user/profile/update', General.AuthenticateToken, user.single('image'), UserController.UpdateUser);
router.get('/api/user/display_one/:code', General.AuthenticateToken, UserController.getOneUser);





//Review controller
router.post('/api/review/add', ReviewController.addNewReview);
router.get('/api/review/all', ReviewController.getReview);





//Appointment controller
router.post('/api/doctor/appointment/add', General.AuthenticateToken, attachment.single('image'), AppointmentController.addNewAppointment);
router.get('/api/doctor/appointment/all', AppointmentController.getAppointment);

router.get('/api/user/appointment/details/:code', AppointmentController.getOneUserAppointment);
router.get('/api/user/appointment/:code', AppointmentController.getUserAppointment);


//Hospital controller
router.post('/api/hospital/add',  HospitalController.addNewHospital);
router.get('/api/hospital/all',  HospitalController.getHospital);
router.get('/api/hospital/view/:code',  HospitalController.getOneHospital);




//Hospital Department controller
router.post('/api/hospital/department/add',   DepartmentDoctorController.addNewDoctorDepartment);
router.get('/api/hospital/department/all',    DepartmentDoctorController.getDoctorsDepartment);
router.get('/api/hospital/department/view/:code',    DepartmentDoctorController. getHospitalDoctor);




//Lab controller
router.post('/api/lab/add', lab.single('image'), LabController.addNewLab);
router.get('/api/lab/all',  LabController.getLab);
router.get('/api/lab/view/:code', LabController.getOneLab);



//LabTest controller
router.post('/api/lab/test/add',  LabTestController.addNewLabTest);
router.get('/api/lab/test/all',  LabTestController.getLabTest);
router.get('/api/lab/test/view/:code', LabTestController.getOneLabTest);

router.get('/api/user/lab_test/:code', LabTestController.getUserLabTest);

router.post('/api/lab/test/booking', LabTestController.AddNewBooking);




//Reminder controller
router.post('/api/user/reminder/add',  ReminderController.AddNewReminder);
router.get('/api/reminder/user/:code',  ReminderController.getUserReminder);





//Offer controller
router.get('/api/discount/offer', General.AuthenticateToken, OfferController.getOffer);
router.get('/api/offer/:code', General.AuthenticateToken, OfferController.ConfirmPromo);
router.post('/api/offer/create', General.AuthenticateToken, OfferController.AddNewOffer);
router.get('/api/discount/active_offer', General.AuthenticateToken, OfferController.getActiveOffer);




//Credit controller
router.post('/api/user/wallet/add',  CreditController.AddNewPayment);
router.get('/api/wallet/display/:wallet',  CreditController.getBalance);
router.get('/api/transaction/display/:wallet',  CreditController.getTransactions);




//Address controller
router.post('/api/user/address/add',  AddressController.AddNewAddress);
router.get('/api/address/display/:code',  AddressController.getAddress);












module.exports = router;