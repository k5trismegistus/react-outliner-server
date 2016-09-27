var GoogleStrategy = require('passport-google-oauth2').Strategy
var User = require('../models/user')
var bCrypt = require('bcrypt-nodejs')
require('dotenv').config()

module.exports = (passport) => {

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_OAUTH_CLIENT,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        var uid = profile.id
        var displayName = profile.displayName
        var avatar = profile._json.image.url
        User.findOneAndUpdate(
          { uid: uid },
          { $set: {
            uid: uid,
            displayName: displayName,
            avatar: avatar
          } },
          { upsert: true },
          (err, user) => {
            return done(null, uid)
          }
         )
      })
    }
  ))
}
