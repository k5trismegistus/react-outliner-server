var express = require('express')
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

  router.post('/login', passport.authenticate('login',
    {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }
  ))

  router.get('/signup', (req, res) => {
    res.render('register', { message: req.flash('message') })
  })

  router.post('/signup', passport.authenticate('signup',
    {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
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
