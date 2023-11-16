const { User, Vacancy } = require('../models');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await User.findOne({ where: { login: 'emangupli' } });
    const vacancy = await Vacancy.findOne({
      where: { title: 'DevOps инженер' },
    });

    await user.addVacancy(vacancy);
  },

  async down(queryInterface, Sequelize) {},
};
