const categoryController = require('./category.controller');
const ProductController = require('./products.controller');
const General = require('./general.controller');
const StoreController = require('./store.controller');
const UserController = require('./user.controller');



const Controllers = {
    categoryController,
    ProductController,
    General,
    StoreController,
    UserController 
  };


  module.exports = Controllers;