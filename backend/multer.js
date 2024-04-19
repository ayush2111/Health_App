const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`); 
  }
});

// Configure Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 16 * 1024 * 1024 
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp3|wav|ogg)$/)) {
      return cb(new Error('Please upload an audio file'));
    }
    cb(null, true);
  }
});

module.exports = upload;