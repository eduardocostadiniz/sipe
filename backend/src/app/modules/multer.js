const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', '..', 'sipe-uploads', 'avatars'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `avatar-${uniqueSuffix}-${file.originalname}`);
  }
});

module.exports = multer({ storage });
