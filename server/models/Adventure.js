const mongoose = require("mongoose");

const adventureSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    duration: {
      type: int,
      required: true,
      default: 0,
    },
    log: {
      type: Array,
      default: [],
    },
    poem: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Adventure = mongoose.model("Adventure", adventureSchema);

module.exports = Adventure;
