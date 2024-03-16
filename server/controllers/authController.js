const User = require("../models/user")
// const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const crypto = require("crypto")

exports.LoginHandler = async (req, res, next) => {
  const { email, password } = req.body

  // Check if the user is already in the database
  try {
    const isUserInDatabase = await User.findOne({ email: email, Social: false })
    if (!isUserInDatabase) {
      // The user is not in the database, so create a new user object and save it
      console.log(`cannot find any user with this email adresse`)
      return res.status(403).json({
        message: `cannot find any user with this email adresse`,
      })
    }
    // const result = await bcrypt.compare(password, isUserInDatabase.password)
    const result = password === isUserInDatabase.password
    if (!result) {
      return res.status(401).json({
        message: `invaild password`,
        user: result,
      })
    }

    console.log("You have successfully logged in!")
    return res.status(200).json({
      message: `Welcome ${isUserInDatabase.username}! You have successfully logged in!`,
      user: isUserInDatabase,
    })
  } catch (error) {
    console.log("creating user failed !")

    console.log(error)
  }
}

exports.SignUpHandler = async (req, res, next) => {
  const { username, email, password } = req.body
  const errors = validationResult(req)
  console.log(errors)

  // Check if the user is already in the database
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // const hashedpassowrd = await bcrypt.hash(password, 12)
    // const UserExiste = await User.findOne({ email: email })
    // if (UserExiste) {
    //   return res.status(400).json({})
    // }
    const socialId = crypto.randomBytes(32).toString("hex")

    const user = new User({
      username: username,
      email: email,
      Social_id: socialId,
      password: password,
      Social: false,
    })

    const result = await user.save()
    if (!result) {
      // The user is not in the database, so create a new user object and save it
      return res.status(400).json({
        message: `failed to created User`,
      })
    }
    console.log("You have successfully sign up !")

    return res.status(200).json({ message: "Registration successful" })
  } catch (error) {
    console.log("registering user failed !")
    console.log(error)
  }
}

exports.getUser = async (req, res, next) => {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId)
      .populate({ path: "saves", populate: { path: "userId saves favorites" } })
      .populate({ path: "pins", populate: { path: "userId saves favorites" } })
      .populate({ path: "favorites", populate: { path: "userId favorites" } })
      .exec()

    if (!user) {
      return res.sendStatus(404)
    }
    res.status(200).json({ message: "success", data: user })
  } catch (error) {
    console.log(error)
  }
}
