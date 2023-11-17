const { Vacancy, User } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await User.findOne({
      where: {
        login: 'emangupli',
      },
    });

    await Vacancy.bulkCreate([
      {
        title: 'Разработчик веб-приложений',
        project: 'ТехноКод',
        salary: 'от 100 000 руб.',
        description:
          'Разработка веб-приложений с использованием современных технологий.',
        userId: user.id,
      },
      {
        title: 'Системный аналитик',
        project: 'ИТСервис',
        salary: 'до 150 000 руб.',
        description:
          'Анализ требований, разработка системных решений для оптимизации бизнес-процессов.',
        userId: user.id,
      },
      {
        title: 'Data Scientist',
        project: 'Аналитико',
        salary: 'от 120 000 руб.',
        description:
          'Анализ данных, разработка моделей машинного обучения и прогнозирования.',
        userId: user.id,
      },
      {
        title: 'UX/UI дизайнер',
        project: 'ДизайнСтудия',
        salary: 'от 90 000 руб.',
        description:
          'Разработка пользовательского интерфейса и визуального дизайна для веб-приложений.',
        userId: user.id,
      },
      {
        title: 'Frontend разработчик',
        project: 'КодМастер',
        salary: 'от 110 000 руб.',
        description:
          'Разработка и поддержка клиентской части веб-приложений с использованием HTML, CSS и JavaScript.',
        userId: user.id,
      },
      {
        title: 'Backend разработчик',
        project: 'СофтСолюшн',
        salary: 'от 130 000 руб.',
        description:
          'Разработка серверной части веб-приложений с использованием языков программирования и баз данных.',
        userId: user.id,
      },
      {
        title: 'DevOps инженер',
        project: 'АвтоДеплой',
        salary: 'до 160 000 руб.',
        description:
          'Настройка и автоматизация процессов разработки, тестирования и развертывания приложений.',
        userId: user.id,
      },
      {
        title: 'Сетевой администратор',
        project: 'СетевойЦентр',
        salary: 'от 100 000 руб.',
        description: 'Настройка и поддержка сетевой инфраструктуры компании.',
        userId: user.id,
      },
      {
        title: 'Информационная безопасность',
        project: 'БезопасныйКод',
        salary: 'от 120 000 руб.',
        description:
          'Обеспечение безопасности информационных систем и данных компании.',
        userId: user.id,
      },
      {
        title: 'IT-консультант',
        project: 'КонсалтПро',
        salary: 'от 90 000 руб.',
        description:
          'Консультирование клиентов по вопросам внедрения и использования информационных технологий.',
        userId: user.id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Vacancy.destroy({ truncate: { cascade: true } });
  },
};
