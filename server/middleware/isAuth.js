const jwt = require("jsonwebtoken")
const User = require("../models/user") // Replace with the actual path to your User model

const isAuth = (req, res, next) => {
  const token = req.headers.authorization // Assuming the token is sent in the Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided." })
  }

  jwt.verify(token, "your-secret-key", async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." })
    }

    try {
      const user = await User.findById(decodedToken.userId) // Assuming your User model has an 'userId' field
      if (!user) {
        return res.status(401).json({ message: "User not found." })
      }

      req.user = user // Add the user object to the request for further use
      next() // Proceed to the next middleware/route
    } catch (error) {
      console.log("Error in isAuth middleware:", error)
      return res.status(500).json({ message: "Internal server error." })
    }
  })
}

module.exports = isAuth
