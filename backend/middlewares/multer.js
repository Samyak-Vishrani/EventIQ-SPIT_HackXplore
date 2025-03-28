const multer = require('multer');
const path = require('path');

// Set up Multer for disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save the uploaded file to the 'uploads' folder
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Give a unique name to each file using timestamps
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Log MIME type and file extension to help debug
    console.log(`MIME Type: ${file.mimetype}`);  // Logs MIME type
    console.log(`File Extension: ${path.extname(file.originalname)}`);  // Logs file extension

    // Define supported file types (images, audio, video, PDFs)
    const fileTypes = /jpeg|jpg|png|pdf|mp3|wav|mp4|mov|avi/;

    // Allow audio/mpeg explicitly for MP3
    const audioMimeTypes = ['audio/mpeg', 'audio/wav'];

    // Test if the file extension and MIME type are allowed
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype) || audioMimeTypes.includes(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      console.log('File type not allowed');
      cb(new Error('Invalid file type! Only images, audio, videos, and PDFs are allowed.'));
    }
  }
});

module.exports = upload;
