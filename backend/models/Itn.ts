import { Schema } from "mongoose";

const mongooses = require("mongoose");

const ItnSchema = new mongooses.Schema(
  {
    num: { type: String, required: true },
    itp: { type: String, required: true },
    subLocation: { type: String, required: false },
    routine: { type: String, required: true },
    dateOfInspection: { type: Date, required: true },
    pdfUrl: { type: String, required: false },
    image1Url: { type: String, required: false },
    image2Url: { type: String, required: false },
    review: { type: String, required: false },
    relatedConcrete: { type: Schema.Types.ObjectId, ref: "Concrete" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Itn", ItnSchema);
