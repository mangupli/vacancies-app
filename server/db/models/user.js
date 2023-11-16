'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Vacancy }) {
      // связь многие ко многим
      this.belongsToMany(Vacancy, {
        // через какую таблицу
        through: 'Favorites',
        // какой внешний ключ для текущей модели
        foreignKey: 'userId',
        // какой внешний ключ для связанной модели
        otherKey: 'vacancyId',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      login: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
