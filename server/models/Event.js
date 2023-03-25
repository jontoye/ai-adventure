const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    storyPrompt: {
      type: String,
    },
    story: {
      type: String,
    },
    optionPrompt: {
        type: String,
    },
    options: {
      type: Array,
      default: [],
    },
    optionChosen: {
      type: Number,
    },
    fullLog: {
      type: Array,
      default: [],
    },
    displayedLog: {
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