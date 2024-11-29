const { Sequelize } = require('sequelize');
const ProductModel = require('./product');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
});

const Product = ProductModel(sequelize);

module.exports = { sequelize, Product };


