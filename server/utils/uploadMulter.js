/* eslint-disable prefer-template */
const multer = require('multer');
const mime = require('mime');

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

module.exports = upload;
