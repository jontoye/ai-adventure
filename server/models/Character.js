const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Character name must be more than 2 characters"],
      maxlength: [16, "Character name cannot be longer than 16 characters."],
    },
    class: {
      type: String,
      lowercase: true,
    },
    ability: {
      type: String,
      lowercase: true,
    },
    weakness: {
      type: String,
      lowercase: true,
    },
    backstory: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character };
