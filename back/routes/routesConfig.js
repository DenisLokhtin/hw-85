const multer = require('multer');
const path = require('path');

const {nanoid} = require("nanoid");
const ID = nanoid();

const storage = multer.diskStorage({
    filename: (req, image, cb) => {
        cb(null, ID + path.extname(image.originalname));
    },
});

const upload = multer({storage});

module.exports = upload;