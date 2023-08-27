const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    console.log("req: ", req);
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
      console.log("users folder, ", folder);
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
      console.log("photos folder, ", folder);
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    console.log("1 - Chegou o file, imageUpload: ", file);
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // Upload only png and jpg image formats (jpg and jpeg is the same thing)
      console.log("2 - Chegou o file, imageUpload: ", cb);
      return cb(
        new Error("Please, only png, jpg our jpeg image format are accepted.")
      );
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
