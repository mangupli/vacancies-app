const router = require('express').Router();
const { ValidationError } = require('sequelize');
const { Vacancy, User } = require('../../db/models');

router.get('/', async (req, res) => {
  const userId = res.locals.user?.id;

  try {
    const user = await User.findOne({
      include: {
        model: Vacancy,
        as: 'FavoriteVacancies',
        through: {
          attributes: [],
        },
      },
      where: { id: userId },
    });

    // очищаем объект от метаданных
    const favorites = user.FavoriteVacancies.map((v) => v.toJSON());
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { id } = req.body;
  const userId = res.locals.user?.id;

  try {
    const user = await User.findOne({ where: { id: userId } });
    const item = await Vacancy.findOne({
      where: { id },
    });

    if (item && user) {
      await user.addFavoriteVacancy(item); //  метод по названию alias в модели user
      return res.sendStatus(204);
    }
    return res.status(400).json({ message: 'Cannot be saved to favorites' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.user?.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const item = await Vacancy.findOne({
      where: { id },
    });

    if (item) {
      await user.removeFavoriteVacancy(item); //  метод по названию alias в модели user
      return res.sendStatus(204);
    }
    return res
      .status(400)
      .json({ message: 'Cannot be deleted from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
