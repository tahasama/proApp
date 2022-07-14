import { Schema } from "mongoose";

const mongooses = require("mongoose");

const ItpSchema = new mongooses.Schema(
  {
    ItpUrl: { type: String, required: true },
    ItpName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Itp", ItpSchema);
