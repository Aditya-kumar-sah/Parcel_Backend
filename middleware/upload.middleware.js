const multer = require("multer");

const storage = multer.memoryStorage(); // Store file in RAM

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/xml" || file.originalname.endsWith(".xml")) {
    cb(null, true);
  } else {
    cb(new Error("Only XML files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

module.exports = upload;
