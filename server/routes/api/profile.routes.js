/* eslint-disable prefer-template */
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const { User } = require('../../db/models');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/avatars/');
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        '-' +
        uniqueSuffix +
        '.' +
        mime.getExtension(file.mimetype)
    );
  },
});
const upload = multer({ storage });

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
