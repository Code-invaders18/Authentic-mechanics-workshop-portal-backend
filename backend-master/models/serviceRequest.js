const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
      maxlength: 12,
    },
    car: {
      type: String,
      trim: true,
      maxlength: 15,
    },
    model: {
      type: Number,
      trim: true,
    },
    serviceDescription: {
      type: String,
      trim: true,
    },
    serviceVisit: {
      type: Number,
      trim: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Service", serviceRequestSchema);
