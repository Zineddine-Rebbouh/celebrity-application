const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const session = require("express-session")
const authRoutes = require("./routes/auth")
const PinRoutes = require("./routes/Pin")
const CommentRoutes = require("./routes/comment")
const passport = require("passport")
const path = require("path")
require("dotenv").config()
require("./passport")
const multer = require("multer")

const app = express()
const port = process.env.PORT || 8000

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/") // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname) // Renaming files
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"))
app.use("/images", express.static(path.join(__dirname, "images")))
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)

const crypto = require("crypto")
const secret = crypto.randomBytes(32).toString("hex")
console.log(secret)
app.use(
  session({
    secret: secret, // Replace with your generated secret
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)
app.use(PinRoutes)
app.use(CommentRoutes)

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => {
    console.log(`mongoose connected ..!`)
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
    const io = require("./socket").init(server)
    io.on("connection", socket => {
      console.log(`${socket.id} is connected`)
    })
  })
  .catch(err => console.log(err))
