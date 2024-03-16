mong
const mongoose = require("mongoose")

const likes = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference the User collection
      required: true,
    },
    pinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pin", // Reference the Board collection
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
module.exports = mongoose.model("Like", likes)
