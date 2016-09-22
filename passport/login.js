var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var bCrypt = require('bcrypt-nodejs')

module.exports = (passport) => {
  passport.use(
    'local',
    new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ 'username': username}), (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, req.flash('message', 'User not found'))
        }
        if (!isValidPassword) {
          return done(null, false, req.flash('message', 'Invalid password'))
        }
        return done(null, user)
      }
    }
  ))

  var isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
  }

}
