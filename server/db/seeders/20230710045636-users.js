const { User } = require('../models');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        login: 'emangupli',
        name: 'Liza',
        password: await bcrypt.hash('123', 10),
      },
      {
        login: 'ypliskovsky',
        name: 'Yura',
        password: await bcrypt.hash('123', 10),
      },
      {
        login: 'amakarova',
        name: 'Anya',
        password: await bcrypt.hash('123', 10),
      },
      {
        login: 'abashkatov',
        name: 'Anatoly',
        password: await bcrypt.hash('123', 10),
      },
      {
        login: 'vponomarenko',
        name: 'Vlad',
        password: await bcrypt.hash('123', 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await User.destroy({ truncate: { cascade: true } });
  },
};
