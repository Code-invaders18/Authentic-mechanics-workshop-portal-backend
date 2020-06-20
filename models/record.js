const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const AllRecordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
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
    fuelType: {
      type: String,
      trim: true,
    },
    serviceDescription: {
      type: String,
      trim: true,
      required: true,
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
//serviceRequestSchema.plugin(require("mongoose-beautiful-unique-validation"));
module.exports = mongoose.model("Record", AllRecordSchema);
