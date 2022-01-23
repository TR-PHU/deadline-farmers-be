const multer = require('multer');
const path = require('path');
const CreateError = require('http-errors')

//Multer config
module.exports = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new CreateError(400, 'File type is not supported'), false);
            return;
        }
        cb(null, true);
    },
})


