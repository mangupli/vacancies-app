const router = require('express').Router();
const { Vacancy } = require('../../db/models');

router
  .route('/')
  .get((req, res) => {
    Vacancy.findAll()
      .then((allVacancies) => res.json({ vacancies: allVacancies }))
      .catch((error) => res.status(500).json(error));
  })
  .post((req, res) => {
    Vacancy.create(req.body)
      .then((newVacancy) => res.status(201).json(newVacancy))
      .catch((error) => res.status(500).json(error));
  });

router
  .route('/:id')
  .put((req, res) => {
    const { id } = req.params;

    Vacancy.update(req.body, { where: { id }, returning: true })
      .then((updatedVacancy) => res.json(updatedVacancy))
      .catch((error) => res.status(500).json(error));
  })
  .delete((req, res) => {
    const { id } = req.params;
    Vacancy.destroy({ where: { id } })
      .then((data) => (data ? res.json(id) : res.status(404).json(data)))
      .catch((error) => res.status(500).json(error));
  });

module.exports = router;
