import { Schema } from "mongoose";

const mongooses = require("mongoose");
const QorNcrSchema = new mongooses.Schema(
  {
    typeR: { type: String, required: true },
    numR: { type: Number, required: true },
    description: { type: String, required: true },
    dateRaised: { type: Date, required: true },
    dateOfResponse: { type: Date, required: false },
    status: { type: String, required: true },
    ncr: { type: String, required: false },
    ncrRes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("QorNcr", QorNcrSchema);
