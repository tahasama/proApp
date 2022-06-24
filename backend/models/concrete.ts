import { Schema } from "mongoose";

const mongooses = require("mongoose");
const ConcreteSchema = new mongooses.Schema(
  {
    type: { type: String, required: true },
    itp: { type: String, required: true },
    subLocation: { type: String, required: false },
    dateOfUsage: { type: Date, required: true },
    quantity: { type: Number, required: false },
    relatedItn: { type: Schema.Types.ObjectId, ref: "Itn" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Concrete", ConcreteSchema);
