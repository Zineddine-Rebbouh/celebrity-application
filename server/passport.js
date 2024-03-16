const GoogleStrategy = require("passport-google-oauth20").Strategy
const TwitterStrategy = require("passport-twitter").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const passport = require("passport")
const User = require("./models/user")
require("dotenv").config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        console.log(profile)
        const existingUser = await User.findOne({ Social_id: profile.id })

        if (existingUser) {
          // User already exists, return the user
          return done(null, existingUser)
        }

        // Create a new user and save it to the database
        const newUser = new User({
          Social_id: profile.id,
          Social: true,
          username: profile.displayName,
          email: profile._json.email,
          password: " ",
          image: profile.photos[0].value,
        })

        await newUser.save()
        return done(null, newUser)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:8000/auth/twitter/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile)
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        console.log(profile)
        const existingUser = await User.findOne({ Social_id: profile.id })

        if (existingUser) {
          // User already exists, return the user
          return done(null, existingUser)
        }

        // Create a new user and save it to the database
        const newUser = new User({
          Social_id: profile.id,
          username: profile.displayName,
          email: profile._json.email,
          password: " ",
          avatar: profile.photos[0].value,
        })

        await newUser.save()
        return done(null, newUser)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id) // Store the user's ID in the session
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user) // Attach the user object to the request (req.user)
  } catch (err) {
    done(err)
  }
})
