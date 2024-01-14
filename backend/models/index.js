
const Sequelize = require("sequelize");
const connection = require('../api/connection');
const getCategoryModel = require("./category.model")
const getProductModel = require("./products.model")
const getStoreModel = require("./store.model");
const getUserModel = require("./user.model");
const getDoctorModel = require("./doctor.model");
const getPaymentModel = require("./payment.model");
const getWithdrawalModel = require("./withdrawal.model");
const getOrdersModel = require("./orders.model");
const getOrderItemsModel = require("./order_items.model");
const getRiderModel = require("./rider.model");
const getSpecialityModel = require("./speciality.model");

const models = {
  Category: getCategoryModel(connection, Sequelize),
  Products: getProductModel(connection, Sequelize), 
  Store: getStoreModel(connection, Sequelize),
  User: getUserModel(connection, Sequelize),
  Doctor: getDoctorModel(connection, Sequelize),
 Payment: getPaymentModel(connection, Sequelize),
 Withdrawal: getWithdrawalModel(connection, Sequelize),
 Orders: getOrdersModel(connection, Sequelize),
 OrderItems: getOrderItemsModel(connection, Sequelize),
 Rider:getRiderModel(connection, Sequelize),
 Speciality:getSpecialityModel(connection, Sequelize)
 
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports = models;