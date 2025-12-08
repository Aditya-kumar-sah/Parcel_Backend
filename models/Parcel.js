const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    street: String,
    houseNumber: String,
    postalCode: String,
    city: String,
  },
  { _id: false }
);

const ParcelSchema = new mongoose.Schema(
  {
    name: String,
    weight: Number,
    value: Number,
    address: AddressSchema,
    isApproved: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcel", ParcelSchema);
