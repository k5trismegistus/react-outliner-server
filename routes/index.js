var express = require('express')
var passport = require('passport')
var router = express.Router()

var isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = (passport) => {
  router.get('/', (req, res, next) => {
    res.render('index', { message: req.flash('message') })
  })

  router.get('/auth/google', passport.authenticate('google',{
      scope: ['profile']
    }
  ))

  router.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/'
    }
  ))

  router.get('/home', isAuthenticated, (req, res) => {
    res.render('home', { user: req.user })
  })

  router.get('/signout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
