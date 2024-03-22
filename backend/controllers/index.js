const categoryController = require('./category.controller');
const ProductController = require('./products.controller');
const General = require('./general.controller');
const StoreController = require('./store.controller');
const UserController = require('./user.controller');
const DoctorController = require('./doctor.controller');
const PaymentController = require('./payment.controller');
const WithdrawalController = require('./withdrawal.controller');
const OrderController = require('./orders.controller');
const RiderController = require('./rider.controller');
const SpecialityController = require('./speciality.controller');
const ReviewController = require('./review.controller');
const AppointmentController = require('./appointment.controller');
const HospitalController = require('./hospital.controller');
const DepartmentDoctorController = require('./department_doctor.controller');

const LabController = require('./lab.controller');
const LabTestController = require('./labTest.controller');
const MainCategoryController = require('./main_category.controller');
const ReminderController = require('./reminder.controller');
const OfferController = require('./offer.controller');
const CreditController = require('./credit.controller');
const AddressController = require('./address.controller');

const Controllers = {
    categoryController,
    ProductController,
    General,
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
  };


  module.exports = Controllers;