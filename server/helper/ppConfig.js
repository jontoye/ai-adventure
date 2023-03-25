const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const GoogleUser = require("../models/GoogleUser");

// serialzeUser
// Saving the data to the session.
// we can save any information in the session
// Id is a unique identifier
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// DeSerializeUser
// Reading the information from the database according to the user id (Session)
passport.deserializeUser(async function (id, done) {
  if (await User.findById(id)) {
    User.findById(id, function (err, user) {
      console.log(user, "<-user is");
      done(err, user);
    });
  } else {
    GoogleUser.findById(id, function (err, user) {
      console.log(user, "<-user is");
      done(err, user);
    });
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailAddress",
      passwordField: "password",
    },
    function (emailAddress, password, done) {
      User.findOne({ emailAddress: emailAddress }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: "/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile)
      GoogleUser.findOne({ googleId: profile.id }, function (err, user) {
        if (err) return cb(err);
        if (user) {
          return cb(null, user);
        } else {
          // we have a new student via OAuth!
          var newUser = new GoogleUser({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newUser.save(function (err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

module.exports = passport;
