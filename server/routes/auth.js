const express = require("express")
const router = express.Router()
const passport = require("passport")
const authController = require("../controllers/authController")
const { body } = require("express-validator")
const User = require("../models/user")

router.post(
  "/login",
  body("email").trim().isEmail().withMessage("Invalid email address"),
  authController.LoginHandler
)

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .custom(async (value, { req }) => {
        const UsernameExiste = await User.findOne({ username: value })
        if (UsernameExiste) {
          throw new Error("Username Already taken !")
        }
        return true
      }),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email address")
      .custom(async (value, { req }) => {
        const UserExiste = await User.findOne({ email: value, Social: false })
        if (UserExiste) {
          throw new Error("User Already existed !")
        }
        return true
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match")
      }
      return true
    }),
  ],
  authController.SignUpHandler
)

router.get("/user-info/:userId", authController.getUser)

const CLIENT_URL = "http://localhost:3000/"

router.get("/login/success", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  }
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  })
})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect(CLIENT_URL)
})

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
)

router.get("/twitter", passport.authenticate("twitter", { scope: ["profile"] }))

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
)

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
)

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
)

module.exports = router
