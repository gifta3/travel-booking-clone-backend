const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => (
    cb(null, 'Uploads')
  ),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtention = file.originalname.split('.').pop();
    cb(
      null,
      file.originalname.split('.')[0] +
        '-' +
        uniqueSuffix +
        '.' +
        fileExtention
    );
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFiletypes = /jpeg|jpg|png|pdf/;
  const extname = allowedFiletypes.test(file.originalname.toLowerCase());
  const mimetype = allowedFiletypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("error only jpeg/jpg/png/pdf files allowed");
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 mb
  },
  fileFilter: fileFilter
});

module.exports = upload;