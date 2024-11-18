const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null,path.join(__dirname, '../../uploads'));  
         console.log(path.join(__dirname, '../../uploads'));

    },
    filename: function(req, file, cb){
         cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    }
})

const upload = multer({storage: storage});

 module.exports = upload;