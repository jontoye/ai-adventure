//APIS for Authentication
// const { User } = require("../models/User");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const salt = 10;
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { response } = require("express");
//HTTP Get - load sign up form

// exports.auth_signup_get = (req, res) => {
//   res.render("auth/signup");
// };

//HTTP Post - post sign up form data

exports.auth_signup_post = (req, res) => {
  // check if password length is greater than 8.
  if (req.body.password.length < 6) {
    res.json({message: 'Password must be at least 6 characters long.'});
    return
  }

  let user = new User(req.body);

  // console.log(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);
  // console.log(hash);
  user.password = hash;

  user.save()
    .then(() => {
      // res.redirect("/auth/signin");
      res.json({ message: "User created successfully!" });
    })
    .catch((err) => {
      console.log(err)
      if (err.code == 11000) {
        // req.flash("error", "Email is already in use");
        // res.redirect("/auth/signin");
        if (Object.keys(err.keyValue).includes("username")) {
          res.json({ message: "Username already exists." });
        } else if (Object.keys(err.keyValue).includes("emailAddress"))  {
          res.json({ message: "Email address already exists." });
        }
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          // req.flash("validationErrors", errors.errors);
          res.json({
            message: "Validation Errors",
            ValidationErrors: errors.errors,
          });
        }
        // res.redirect("/auth/signup");
        if (err.errors.username) {
          res.json({ message: err.errors.username.properties.message });
        } else if (err.errors.emailAddress) {
          res.json({ message: err.errors.emailAddress.properties.message });
        } else if (err.errors.password) {
          res.json({ message: err.errors.password.properties.message });
        } else
        res.json({ message: "Error creating user. Please try again later." });
      }
    });
};

//HTTP Get - Sign in - to load the signin form
// exports.auth_signin_get = (req, res) => {
//   res.render("auth/signin");
// };

//HTTP Post - Sign in - post the sign in form data
// exports.auth_signin_post = passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/auth/signin",
//   failureFlash: "Invalid Login Info",
//   successFlash: "You are logged in successfully",
// });
exports.auth_signin_post = async (req, res) => {
  // req.body.emailAddress
  // req.body.password

  let { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User not found." }).status(400);
    }

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Incorrect password." }).status(400);
    }

    const payload = {
      user: {
        id: user._id,
        name: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "Login successful." }).status(200);
      }
    );
  } catch (error) {
    res.json({ message: "You are not logged in." }).status(400);
  }
};

//HTTP Get - Logout - to logout the user

// exports.auth_logout_get = (req, res) => {
//   //This will clear the session
//   req.logout();
//   // req.flash("success", "You are successfully logged out");
//   res.redirect("/auth/signin");
// };
