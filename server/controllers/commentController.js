const Pin = require("../models/pin")
const Comment = require("../models/comment")
const io = require("../socket")

exports.addComment = async (req, res, next) => {
  const { text, userId, pinId } = req.body

  try {
    let newComment = await Comment.create({ text, userId, pinId })
    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId"
    )

    // Associate the new comment with the pin
    await Pin.findByIdAndUpdate(pinId, { $push: { comments: newComment._id } })

    // ... other socket events

    console.log(newComment)

    io.getIO().emit("comments", {
      action: "adding comment",
      comment: populatedComment,
    })

    res.status(200).json({ message: "add comments succes .. !" })
  } catch (error) {
    console.log(`Error adding comment ${error}`)
  }
}
