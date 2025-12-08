const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");
const { verifyJWT, requireDepartment } = require("../middleware/auth");

// GET /parcels/pending - list to-be-approved parcels
router.get("/pending", verifyJWT, async (req, res) => {
  try {
    const pending = await Parcel.find({ status: "PENDING" })
      .sort({ createdAt: -1 });

    res.json(pending);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /parcels/:id/approve - insurance-only approval
router.patch("/:id/approve", verifyJWT, requireDepartment("insurance"), async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Parcel.findOneAndUpdate(
      { _id: id, status: "PENDING" },
      {
        $set: {
          status: "APPROVED",
          approvedBy: req.user.userId,
          approvedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Parcel not found or already processed" });
    }

    res.json({ message: "Approved", parcel: updated });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
