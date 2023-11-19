const router = require('express').Router();
const { User } = require('../../db/models');
const upload = require('../../utils/uploadMulter');

router.put('/update-profile', async (req, res) => {
  const { description } = req.body;
  const userId = res.locals.user?.id;

  try {
    const user = await User.findByPk(userId);
    user.description = description;
    await user.save();

    delete user.password; //  чтобы не отправлять пароль на клиент
    
    res.json(user);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

router.post('/upload-photo', upload.single('photo'), async (req, res) => {
  const userId = res.locals.user?.id;
  try {
    // Обработка загруженного файла
    const uploadedFile = req.file;
    const filePath = uploadedFile.path.replace('public', '');

    const user = await User.findByPk(userId);
    user.photo = filePath;
    await user.save();

    delete user.password; //  чтобы не отправлять пароль на клиент

    res.json(user);
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
