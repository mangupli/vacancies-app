'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // связь многие ко многим
      this.belongsToMany(User, {
        // через какую таблицу
        through: 'Favorites',
        as: 'UserFavorites',
        // какой внешний ключ для текущей модели
        foreignKey: 'vacancyId',
        // какой внешний ключ для связанной модели
        otherKey: 'userId',
      });
    }
  }
  Vacancy.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      project: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salary: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Vacancy',
    }
  );
  return Vacancy;
};
