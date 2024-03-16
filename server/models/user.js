const mongoose = require("mongoose")

const User = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a Username"],
    unique: true,
  },
  Social_id: {
    type: String,
  },
  Social: {
    type: Boolean,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "../assets/profileImage.jpg",
  },
  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pin", // Reference the User collection
    },
  ],
  saves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pin", // Reference the User collection
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pin", // Reference the User collection
    },
  ],
})

module.exports = mongoose.model("user", User)
