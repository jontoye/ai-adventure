const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email.",
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;