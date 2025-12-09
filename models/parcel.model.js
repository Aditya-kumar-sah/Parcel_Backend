const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: String,
  houseNumber: String,
  postalCode: String,
  city: String,
});

const ParcelSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  value: Number,
  address: AddressSchema,
  isApproved : Boolean,
  department:String,
},{ timestamps: true });

module.exports = mongoose.model("Parcel", ParcelSchema);
