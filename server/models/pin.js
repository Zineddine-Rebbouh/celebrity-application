const mongoose = require("mongoose")

const pin = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: " ",
    },
    image: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference the User collection
      required: true,
    },
    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference the User collection
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference the User collection
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference the User collection
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("pin", pin)
