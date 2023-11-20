const fs = require('fs/promises');

async function checkAndCreateFolder(pathToDir) {
  const avatarsFolderPath = pathToDir;

  try {
    // Проверяем, существует ли папка img/avatars
    await fs.access(avatarsFolderPath);

    console.log('Папка img/avatars уже существует.');
  } catch (error) {
    // Если папка не существует, создаем ее
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(avatarsFolderPath, { recursive: true });
        console.log('Папка img/avatars успешно создана.');
      } catch (err) {
        console.error('Ошибка при создании папки img/avatars:', err);
      }
    } else {
      console.error('Ошибка при проверке папки img/avatars:', error);
    }
  }
}

module.exports = checkAndCreateFolder;
