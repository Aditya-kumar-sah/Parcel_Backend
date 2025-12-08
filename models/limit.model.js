const mongoose = require("mongoose");

const CategoryRangeSchema = new mongoose.Schema(
  {
    minValue: {
      type: Number,
      required: true,
      default: 1,
    },

    maxValue: {
      type: Number,
      required: true,
      default:10,
    },

    thresholdValue: {
      type: Number,
      required: true,
      default:1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryRange", CategoryRangeSchema);
