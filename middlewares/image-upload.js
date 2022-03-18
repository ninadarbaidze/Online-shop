const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
   storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: function(req, file, cb) {
        cb(null, uuid() + '-' + file.originalname) //image name will be unique id + filename+extensionname (jpeg, png)
    } 
   })
});

const multerMiddleware = upload.single('image'); //image is the name of upload input.

module.exports = multerMiddleware;