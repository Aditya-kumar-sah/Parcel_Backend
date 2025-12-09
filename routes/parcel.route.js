const {Router} = require("express");
const { UserAuth, FinanceDeptAuth } = require("../middleware/auth.middleware");
const { uploadXmlAndSaveParcels, getApprovedParcels, getPendingParcels, approveParcel, rejectParcel } = require("../controllers/parcel.controller");
const upload = require("../middleware/upload.middleware");

const router = Router();

router.post("/upload-xml",UserAuth,upload.single("file"),uploadXmlAndSaveParcels);
router.get("/approved", UserAuth,getApprovedParcels);

router.get("/pending", FinanceDeptAuth, getPendingParcels);

router.post("/:id/approve",FinanceDeptAuth,approveParcel);

router.delete("/:id/reject",FinanceDeptAuth,rejectParcel);

module.exports = router