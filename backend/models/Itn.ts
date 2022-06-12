const mongooses = require("mongoose");

const ItnSchema = new mongooses.Schema(
  {
    num: { type: String, required: true },
    itp: { type: String, required: true },
    subLocation: { type: String, required: false },
    routine: { type: String, required: true },
    dateOfInspection: { type: Date, required: true },
    pdfUrl: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("Itn", ItnSchema);
