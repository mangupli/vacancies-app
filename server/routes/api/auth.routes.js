const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');
const generateTokens = require('../../utils/authUtils');
const jwtConfig = require('../../config/jwtConfig');

// аутентицикация существующего пользователя
router.post('/login', async (req, res) => {
  const { login, password } = req.body;

  try {
    // проверить, есть ли такой юзер в бд
    const user = await User.findOne({ where: { login }, raw: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Такого пользователя не существует',
      });
    }

    //  проверить пароли
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(403).json({
        success: false,
        message: 'Неправильный пароль',
      });
    }

    const userData = { ...user, password: undefined };

    // сгенерируем jwt токены
    const { accessToken, refreshToken } = generateTokens({
      user: userData,
    });

    // устанавливаем куки
    res.cookie(jwtConfig.access.type, accessToken, {
      maxAge: jwtConfig.access.expiresIn,
      httpOnly: true,
    });
    res.cookie(jwtConfig.refresh.type, refreshToken, {
      maxAge: jwtConfig.refresh.expiresIn,
      httpOnly: true,
    });

    // отправляем ответ
    return res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// создание нового пользователя
router.post('/register', async (req, res) => {
  const { name, login, password } = req.body;

  if (name === '' || login === '' || password === '') {
    return res
      .status(400)
      .json({ success: false, message: 'Заполните все поля' });
  }

  try {
    // если пользователь с таким login уже есть, возвращаем ошибку
    const foundUser = await User.findOne({ where: { login } });
    if (foundUser) {
      return res
        .status(400)
        .json({ success: false, message: 'Такой пользователь уже существует' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, login, password: hash });

    const userData = { id: user.id, name: user.name, login: user.login };

    return res.json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// при логауте чистим все куки
router.get('/logout', (req, res) => {
  try {
    res.clearCookie(jwtConfig.access.type).clearCookie(jwtConfig.refresh.type);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// проверка активной сессии и отправка информации о пользователе
router.get('/check', async (req, res) => {
  const { user } = res.locals; // ищем активную сессию
  const userData = await User.findByPk(user?.id); // ищем пользователя в бд(чтобы подтнуть информацию о его профиле)
  if (user && userData) {
    delete userData.password; //  чтобы не отправлять пароль на клиент
    res.json({
      isLoggedIn: true,
      user: userData,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

module.exports = router;
