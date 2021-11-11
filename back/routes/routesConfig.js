const multer = require('multer');
const path = require('path');
const config = require('../config');

const {nanoid} = require("nanoid");

const storage = multer.diskStorage({
    destination: (req, image, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, image, cb) => {
        cb(null, nanoid() + path.extname(image.originalname));
    },
});

const upload = multer({storage});

module.exports = upload;