const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    recipientName: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String },
    weight: { type: Number },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
