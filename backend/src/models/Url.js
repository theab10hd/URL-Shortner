const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: function () {
        return this.shortenUrl;
      },
    },
    shortenUrl: {
      type: String,
      required: true,
      unique: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
