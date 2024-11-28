// 'use strict';
// const { Model, Sequelize, DataTypes } = require('sequelize');


// module.exports = (sequelize, DataTypes) => {
//   class Product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }

//   Product.init({
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//   }, {
//     sequelize,
//     modelName: 'Product',
//     timestamps: false, // Disable timestamps
//   });
//   // const Product = sequelize.define('Product', {
//   //   name: {
//   //     type: DataTypes.STRING,
//   //     allowNull: false,
//   //   },
//   //   price: {
//   //     type: DataTypes.FLOAT,
//   //     allowNull: false,

//   //   }
//   // });
//   return Product;
// };

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {}
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      timestamps: false, // Disable timestamps
    }
  );
  return Product;
};

