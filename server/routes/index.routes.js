const router = require('express').Router();

const vacanciesRouter = require('./api/vacancies.routes');
const favoritesRouter = require('./api/favorites.routes');
const authRouter = require('./api/auth.routes');

const rejectIfNotAuthorized = require('../middlewares/rejectIfNotAuthorized');

router.use('/api/auth', authRouter);
router.use('/api/vacancies', vacanciesRouter);

// router.use(rejectIfNotAuthorized); // защита роутов ниже от неаутентицированных пользователей

router.use('/api/favorites', favoritesRouter);

module.exports = router;
