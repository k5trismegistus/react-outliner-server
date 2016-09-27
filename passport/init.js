var login = require('./login');
var signup = require('./signup');
var User = require('../models/user');

module.exports = (passport) => {

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser((req, uid, done) => {
        console.log('serializing user: ');
				console.log(uid);
        done(null, uid);
    });

    passport.deserializeUser((req, uid, done) => {
        User.findOne({ uid: uid }, (err, user) => {
            console.log('deserializing user:', user);
            done(err, user);
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
}
