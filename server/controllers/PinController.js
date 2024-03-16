const Pin = require("../models/pin")
const Comment = require("../models/comment")
const User = require("../models/user")
const path = require("path")
const fs = require("fs")

const searchPins = async query => {
  try {
    const pins = await Pin.find({ title: { $regex: query, $options: "i" } })
      .populate({ path: "userId" })
      .populate({ path: "saves" })
    return pins
  } catch (error) {
    console.error("Error searching pins:", error)
    throw error
  }
}

exports.getAllPins = async (req, res, next) => {
  const { search } = req.query
  let pins

  try {
    if (search) {
      pins = await searchPins(search)
    } else {
      pins = await Pin.find()
        .populate({ path: "userId" })
        .populate({ path: "saves" })
        .populate({ path: "favorites" })
    }

    return res.status(200).json(pins)
  } catch (error) {
    console.log("Error in getAllPins", error)
  }
}

exports.CreatePin = async (req, res, next) => {
  const { title, description, destination, userId } = req.body

  try {
    const pin = new Pin({
      title: title,
      description: description,
      image: req.file.path,
      destination: destination,
      userId: userId,
      saves: [],
      comments: [],
    })

    const result = await pin.save()
    await User.findByIdAndUpdate(userId, { $push: { pins: result._id } })
    res.status(200).json({ message: "creating post sucess !" })
  } catch (error) {
    console.log("Error creating a pin", error)
  }
}

exports.FavoritePin = async (req, res, next) => {
  const { pinId, userId } = req.body

  try {
    const pin = await Pin.findById(pinId)
    const user = await User.findById(userId)

    if (!pin || !user) {
      return res.status(404).json({ message: "Pin or user not found." })
    }

    // Remove pin from user's saves
    await User.findByIdAndUpdate(userId, {
      $push: { favorites: pinId }, // Pass the ObjectId of the pin
    })

    // Remove user from pin's saves
    await Pin.findByIdAndUpdate(pinId, {
      $push: { favorites: userId }, // Pass the ObjectId of the user
    })

    console.log("inserting the favorite pin successfully!")
    res.status(200).json({ message: "inserting the saved pin successfully!" })
  } catch (error) {
    console.log(`Error inserting saved pin: ${error}`)
    res
      .status(500)
      .json({ message: "An error occurred while deleting the saved pin." })
  }
}

exports.SavePin = async (req, res, next) => {
  const { pinId, userId } = req.body

  try {
    const pin = await Pin.findById(pinId)
    const user = await User.findById(userId)

    if (!pin || !user) {
      return res.status(404).json({ message: "Pin or user not found." })
    }

    // Remove pin from user's saves
    await User.findByIdAndUpdate(userId, {
      $push: { saves: pinId }, // Pass the ObjectId of the pin
    })

    // Remove user from pin's saves
    await Pin.findByIdAndUpdate(pinId, {
      $push: { saves: userId }, // Pass the ObjectId of the user
    })

    console.log("inserting the saved pin successfully!")
    res.status(200).json({ message: "inserting the saved pin successfully!" })
  } catch (error) {
    console.log(`Error inserting saved pin: ${error}`)
    res
      .status(500)
      .json({ message: "An error occurred while deleting the saved pin." })
  }
}

exports.deletePin = async (req, res, next) => {
  const pinId = req.params.pinId

  try {
    const pin = await Pin.findById(pinId)

    await User.deleteMany({ _id: { $in: pin.comments } })
    await Comment.deleteMany({ _id: { $in: pin.comments } })

    await User.updateMany(
      { $or: [{ saves: pinId }, { favorites: pinId }] },
      {
        $pull: {
          saves: pinId,
          favorites: pinId,
        },
      }
    )
    clearImage(pin.image)
    await Pin.findByIdAndRemove(pinId) // Corrected function name

    res.status(200).json({ message: "Deleted pin successfully!" })
  } catch (error) {
    console.log(`Error deleting pin ${error}`)
  }
}

exports.getPin = async (req, res, next) => {
  const pinId = req.params.pinId

  try {
    const data = await Pin.findById(pinId)
      .populate({ path: "userId" })
      .populate({ path: "saves" })
      .populate({ path: "favorites" }) // Populate user data
      .populate({
        path: "comments",
        populate: { path: "userId" }, // Populate user info for comments
      })
    return res.status(200).json({ pin: data })
  } catch (error) {
    console.log(`Error fetching pin ${error}`)
  }
}

exports.DeleteFavoritePin = async (req, res) => {
  const { pinId, userId } = req.body

  try {
    const pin = await Pin.findById(pinId)
    const user = await User.findById(userId)

    if (!pin || !user) {
      return res.status(404).json({ message: "Pin or user not found." })
    }

    // Remove pin from user's saves
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: pinId }, // Pass the ObjectId of the pin
    })

    // Remove user from pin's saves
    await Pin.findByIdAndUpdate(pinId, {
      $pull: { favorites: userId }, // Pass the ObjectId of the user
    })

    console.log("Deleting the saved pin successfully!")
    res.status(200).json({ message: "Deleting the saved pin successfully!" })
  } catch (error) {
    console.log(`Error deleting saved pin: ${error}`)
    res
      .status(500)
      .json({ message: "An error occurred while deleting the saved pin." })
  }
}

exports.DeleteSavePin = async (req, res) => {
  const { pinId, userId } = req.body

  try {
    const pin = await Pin.findById(pinId)
    const user = await User.findById(userId)

    if (!pin || !user) {
      return res.status(404).json({ message: "Pin or user not found." })
    }

    // Remove pin from user's saves
    await User.findByIdAndUpdate(userId, {
      $pull: { saves: pinId }, // Pass the ObjectId of the pin
    })

    // Remove user from pin's saves
    await Pin.findByIdAndUpdate(pinId, {
      $pull: { saves: userId }, // Pass the ObjectId of the user
    })

    console.log("Deleting the saved pin successfully!")
    res.status(200).json({ message: "Deleting the saved pin successfully!" })
  } catch (error) {
    console.log(`Error deleting saved pin: ${error}`)
    res
      .status(500)
      .json({ message: "An error occurred while deleting the saved pin." })
  }
}

const clearImage = filePath => {
  filePath = path.join(__dirname, "..", filePath)
  fs.unlink(filePath, err => console.log(err))
}
