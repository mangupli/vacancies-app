const router = require('express').Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // сохранение файла в памяти, можно изменить на другое место

const upload = multer({ storage: storage });

router.post('/upload-photo', upload.single('photo'), (req, res) => {
  try {
    // Обработка загруженного файла
    const uploadedFile = req.file;

    // Ваш код для сохранения файла на сервере и обновления информации о пользователе

    res.json({ message: 'Фотография успешно обновлена' });
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

module.exports = router;
