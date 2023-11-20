require('@babel/register');
require('dotenv').config();
const express = require('express');
const path = require('path');

const serverConfig = require('./config/serverCofnig');
const indexRouter = require('./routes/index.routes');
const checkUser = require('./middlewares/verifyJWT');

const checkAndCreateFolder = require('./utils/checkAndCreateFolder');

const app = express();

serverConfig(app);

// создание папки для сохранения фотографий пользователя
checkAndCreateFolder(path.join(__dirname, 'public', 'img', 'avatars'))

// проверка JWT токенов
app.use(checkUser);

app.use('/', indexRouter);

const PORT = 4000;

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запустился на ${PORT}`);
});
