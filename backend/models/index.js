
const getCategoryModel = require("./category.model")
const getProductModel = require("./products.model")
const Sequelize = require("sequelize");
const connection = require('../api/connection');



const models = {
  Category: getCategoryModel(connection, Sequelize),
  Products: getProductModel(connection, Sequelize), 
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});


module.exports = models;