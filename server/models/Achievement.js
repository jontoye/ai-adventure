const mongoose = require("mongoose");

const achievementSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    trigger: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
