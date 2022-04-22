const mongoose = require("mongoose");

const characterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Username must be more than 3 characters"],
      maxlength: [20, "Username cannot be longer than 20 characters."],
    },
    class: {
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
