import { Schema } from "mongoose";

const mongooses = require("mongoose");
const LabSchema = new mongooses.Schema(
  {
    typeL: { type: String, required: false },
    location: { type: String, required: false },
    numL: { type: String, required: false },
    dateL: { type: Date, required: false },
    manifoldUrl: { type: String, required: false },
    reportUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Lab", LabSchema);
