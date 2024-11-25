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
      this.belongsTo(models.company_information, {
        foreignKey: 'companyId'
      })
    }
  }
  bank_information.init({
    companyId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank: {
      type:  DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName:'bank_information',
    modelName: 'bank_information',
  });
  return bank_information;
};