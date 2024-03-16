const mongoose = require("mongoose")

const comment = mongoose.Schema(
  {
    text: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference the User collection
      required: true,
    },
    pinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin", // Reference the Board collection
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Like = mongoose.model("Comment", comment)
