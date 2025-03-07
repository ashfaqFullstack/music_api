const util = require('util');
const multer = require('multer');
const maxSize = 30 * 1024 * 1024; //2mb
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const uploadDynamic = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const directory = `./public/uploads/${req.user.id}`;
      console.log('direc');

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      cb(null, directory);
    },
    filename: async (req, file, cb) => {
      // const validateFile = await checkFileType(file);
      const validateFile = file;
      const directory = `./public/uploads/${req.user.id}`;
      const fileType = file.originalname.split('.').pop();
      const fileName = file.fieldname;
      console.log(file);
      const fileDiretory = `${directory}/${fileName}`;
      console.log('valid');
      if (validateFile) {
        await readdir(directory, function (err, files) {
          if (err) {
            console.log('error read directory files while upload');
            console.log(err);
          }

          if (files.length >= 1) {
            files.forEach(async (file) => {
              let extFile = file.split('.').pop();
              let existFilename = file.split('.').shift();
              if (existFilename == fileName) {
                await unlink(`${fileDiretory}.${extFile}`);
              }
            });
          }

          cb(null, `${fileName}.${fileType}`);
        });
      } else {
        cb(new Error(`Unacceptable file ${fileName} format`), false);
      }
    },
  }),
  limits: { fileSize: maxSize },
});

const checkFileType = async (file) => {
  const filetypes = /jpeg|jpg|png/;
  const fileType = file.originalname.split('.').pop();
  const extname = filetypes.test(fileType.toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return true;
  } else {
    return false;
  }
};

// let uploadFile = util.promisify(uploadDynamic);
module.exports = {
  uploadDynamic,
};
