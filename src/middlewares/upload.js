const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("public", "uploads", "profile-pictures"));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: function (req, file, cb) {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            return cb(null, true);
        }

        cb(new Error('Only images are allowed'));
    }
})

module.exports = upload;