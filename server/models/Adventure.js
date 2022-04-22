const mongoose = require("mongoose");

const adventureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, "Adventure name must be longer than 2 characters"],
      maxlength: [64, "Adventure name cannot be longer than 64 characters."],
    },
    genre: {
      type: String,
      lowercase: true,
    },
    setting: {
      type: String,
      lowercase: true,
    },
    length: {
      type: String,
      lowercase: true,
    },
    characterStory: {
      type: String,
    },
    quest: {
      type: String,
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
