
const Sequelize = require("sequelize");
const connection = require('../api/connection');
const getCategoryModel = require("./category.model")
const getProductModel = require("./products.model")
const getStoreModel = require("./store.model");
const getUserModel = require("./user.model");


const models = {
  Category: getCategoryModel(connection, Sequelize),
  Products: getProductModel(connection, Sequelize), 
  Store: getStoreModel(connection, Sequelize),
  User: getUserModel(connection, Sequelize)
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports = models;