const express = require("express")
const CommentController = require("../controllers/commentController")

const router = express.Router()

router.post("/pin/add-comment", CommentController.addComment)

module.exports = router
