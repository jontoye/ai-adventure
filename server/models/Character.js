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
      required: true,
    },
    ability: {
      type: String,
      lowercase: true,
      required: true,
    },
    weakness: {
      type: String,
      lowercase: true,
      required: true,
    },
    backstory: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      default: '/images/class/default.png',
    }
  },
  {
    timestamps: true,
  }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
