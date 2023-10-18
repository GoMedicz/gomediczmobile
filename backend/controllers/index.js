const categoryController = require('./category.controller');
const ProductController = require('./products.controller');
const General = require('./general.controller');
const StoreController = require('./store.controller');
const UserController = require('./user.controller');
const DoctorController = require('./doctor.controller');
const PaymentController = require('./payment.controller');
const WithdrawalController = require('./withdrawal.controller');
const OrderController = require('./orders.controller');

const Controllers = {
    categoryController,
    ProductController,
    General,
    StoreController,
    UserController,
    DoctorController,
    PaymentController,
    WithdrawalController,
    OrderController
  };


  module.exports = Controllers;