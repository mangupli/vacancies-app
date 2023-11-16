const router = require('express').Router();
const vacanciesRouter = require('./api/vacancies.routes');
const authRouter = require('./api/auth.routes');

router.use('/api/vacancies', vacanciesRouter);
router.use('/api/auth', authRouter);

module.exports = router;
