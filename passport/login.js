var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var bCrypt = require('bcrypt-nodejs')

module.exports = (passport) => {
  passport.use(
    'login',
    new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, done) => {
      console.log(username)
      User.findOne({ 'username': username }, (err, user) => {
        console.log(user)
        if (err) {
          return done(err)
        }

        if (!user) {
          return done(null, false, req.flash('message', 'User not found'))
        }

        if (!isValidPassword(user, password)) {
          return done(null, false, req.flash('message', 'Invalid password'))
        }
        return done(null, user)
      })
    }
  ))

  var isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password)
  }

}
