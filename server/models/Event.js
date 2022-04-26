const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    prompt: {
      type: String,
    },
    story: {
      type: String,
    },
    options: {
      type: Array,
      default: [],
    },
    optionChosen: {
      type: Number,
    },
    log: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;