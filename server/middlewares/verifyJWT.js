const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/authUtils');
const jwtConfig = require('../config/jwtConfig')

// логика проверки refresh token
function verifyRefreshToken(req, res, next) {
  // проверяем, если есть кука с refresh token
  const { refresh } = req.cookies;

  try {
    const { user } = jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

    // если верификация прошла успешно, то кладем user в res.locals (зачем он там нужен?)
    res.locals.user = user;

    // сгенерируем  новые jwt токены
    const { accessToken, refreshToken } = generateTokens({
      user: { id: user.id, name: user.name, email: user.email },
    });

    // Возвращаем токены в httpOnly cookie при ответе
    // устанавливаем куки
    res.cookie(jwtConfig.access.type, accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie(jwtConfig.refresh.type, refreshToken, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    });

    // мы внутри мидлварки, поэтому отправляем запрос дальше
    next();
  } catch (error) {
    // сюда упали, если refresh кука была, но верификацию не прошла, значит - кука некорректная
    res.clearCookie(jwtConfig.refresh.type);
    next();
  }
}

// логика проверки access token
function verifyAccessToken(req, res, next) {
  // проверяем, если есть кука с access token
  const { access } = req.cookies;

  const { user } = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET);
  // если верификация прошла успешно, то кладем user в res.locals
  res.locals.user = user;
  // и отправляем запрос дальше
  next();
}

function checkUser(req, res, next) {
  try {
    // проверка access token
    verifyAccessToken(req, res, next);
  } catch (error) {
    // если access нет или она некорректная, то упадёт сюда - следующий шаг проверка refresh
    res.clearCookie(jwtConfig.access.type); //  на всякий случай чистим некорректную куку
    verifyRefreshToken(req, res, next);
  }
}

module.exports = checkUser;
