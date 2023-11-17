const router = require('express').Router();
const { ValidationError } = require('sequelize');
const { Vacancy } = require('../../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const items = await Vacancy.findAll({ raw: true });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      await Vacancy.create(req.body);
      res.sendStatus(201);
    } catch (error) {
      if (error instanceof ValidationError) {
        // в req.body не все необходимые поля - это ошибка клиента
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  });

router
  .route('/:id')
  .put(async (req, res) => {
    const { id } = req.params;

    try {
      const updated = await Vacancy.update(req.body, {
        where: { id },
        returning: true, // если нужно, чтобы вернулась сущность, которая изменилась
      });
      console.log(updated);
      if (updated[0] > 0) {
        return res.sendStatus(204);
        // return res.json(updated[1])// вернется массив измененных сущностей
      }
      return res.status(400).json({ message: 'Cannot be updated' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await Vacancy.destroy({ where: { id } });
      if (removed > 0) {
        return res.sendStatus(204);
      }
      return res.status(400).json({ message: 'Cannot be deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
