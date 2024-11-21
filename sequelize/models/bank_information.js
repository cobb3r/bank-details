'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank_information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  bank_information.init({
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    expiry: DataTypes.STRING,
    cvv: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bank_information',
  });
  return bank_information;
};