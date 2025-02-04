const multer = require('multer');
const path = require('path');
const maxSize = 2 * 1024 * 1024; 

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(req,file, cb) {
    // Allowed ext  
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    // const mimetype = filetypes.test(file.mimetype);
    console.log(file.originalname);

    if (
        // mimetype && 
        extname) {
        return cb(null, true);
    } else {
        cb('Error: File Type not supported',false);
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize }, // 1MB limit
    fileFilter: checkFileType
}).single('profilePicture');

module.exports = upload;