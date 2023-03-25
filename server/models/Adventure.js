const mongoose = require("mongoose");

const adventureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Adventure name must be longer than 2 characters"],
      maxlength: [41, "Adventure name cannot be longer than 40 characters."],
    },
    genre: {
      type: String,
      lowercase: true,
      required: true,
    },
    setting: {
      type: String,
      lowercase: true,
      required: true,
    },
    length: {
      type: String,
      lowercase: true,
      required: true,
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Character",
    },
    quest: {
      type: String,
      required: true,
    },
    log: {
      type: Array,
      default: [],
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    poem: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1462759353907-b2ea5ebd72e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2231&q=80",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Adventure = mongoose.model("Adventure", adventureSchema);

module.exports = Adventure;
