'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // это связующая таблица - тут нет связей
    }
  }
  Favorites.init(
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
      vacancyId: {
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Vacancies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Favorites',
    }
  );
  return Favorites;
};
