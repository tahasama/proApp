import { Schema } from "mongoose";

const mongooses = require("mongoose");
const ReinforcementSchema = new mongooses.Schema(
  {
    itp: { type: String, required: false },
    type: { type: String, required: false },
    subLocation: { type: String, required: false },
    dateOfUsage: { type: Date, required: false },
    quantity: { type: Number, required: false },
    relatedDocs: { type: String, required: false },
    review: { type: String, required: false },
    numY: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Reinforcement", ReinforcementSchema);
