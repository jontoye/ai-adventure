const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Character name must be longer than 2 characters"],
      maxlength: [32, "Character name cannot be longer than 32 characters."],
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

module.exports = Character;
