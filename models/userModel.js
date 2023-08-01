const mongoose = require("mongoose");
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
    },
    sKey: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["0", "1"],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
