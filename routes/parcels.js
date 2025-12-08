const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");
const { verifyJWT, requireDepartment } = require("../middleware/auth");

// GET /parcels/pending - list not yet approved parcels
router.get("/pending", verifyJWT, async (req, res) => {
  try {
    const pending = await Parcel.find({ isApproved: false })
      .sort({ createdAt: -1 });

    res.json(pending);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /parcels/:id/approve - insurance-only
router.patch(
  "/:id/approve",
  verifyJWT,
  requireDepartment("insurance"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Parcel.findOneAndUpdate(
        { _id: id, isApproved: false },
        { $set: { isApproved: true } },
        { new: true }
      );

      if (!updated) {
        return res
          .status(404)
          .json({ message: "Parcel not found or already approved" });
      }

      res.json({ message: "Approved", parcel: updated });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /parcels/:id/reject - insurance-only, remove from DB
router.delete(
  "/:id/reject",
  verifyJWT,
  requireDepartment("insurance"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const deleted = await Parcel.findOneAndDelete(
        { _id: id, isApproved: false }
      );

      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Parcel not found or already approved" });
      }

      res.json({ message: "Rejected and removed", parcelId: id });
    } catch {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
