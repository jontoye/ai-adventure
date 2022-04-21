const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/User");

// serialzeUser
// Saving the data to the session.
// we can save any information in the session
// Id is a unique identifier
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// DeSerializeUser
// Reading the information from the database according to the user id (Session)
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

passport.use(new LocalStrategy(
    {
        usernameField: "emailAddress",
        passwordField: "password"
    },
    function(emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));



module.exports = passport;