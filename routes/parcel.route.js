const {Router} = require("express");
const { UserAuth } = require("../middleware/auth.middleware");
const { uploadXmlAndSaveParcels } = require("../controllers/parcel.controller");
const upload = require("../middleware/upload.middleware");

const router = Router();

router.post("/upload-xml",UserAuth,upload.single("file"),uploadXmlAndSaveParcels);

module.exports = router