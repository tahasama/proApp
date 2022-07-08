const mongooses = require("mongoose");

const UserSchema = new mongooses.Schema(
  {
    uid: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: false },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooses.model("User", UserSchema);
