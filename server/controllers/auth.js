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

exports.auth_signup_get = (req, res) => {
  res.render("auth/signup");
};

//HTTP Post - post sign up form data

exports.auth_signup_post = (req, res) => {
  let user = new User(req.body);
  console.log(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);
  console.log(hash);
  user.password = hash;

  user
    .save()
    .then(() => {
      // res.redirect("/auth/signin");
      res.json({ message: "User created successfully!" });
    })
    .catch((err) => {
      if (err.code == 11000) {
        // req.flash("error", "Email is already in use");
        // res.redirect("/auth/signin");
        res.json({ message: "Email Already Exists" });
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
        res.json({ message: "Error Creating User. Please try again later" });
      }
    });
};

//HTTP Get - Sign in - to load the signin form
exports.auth_signin_get = (req, res) => {
  res.render("auth/signin");
};

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

  let { emailAddress, password } = req.body;

  try {
    let user = await User.findOne({ emailAddress });
    console.log(user);

    if (!user) {
      return res.json({ message: "User Not Found!!!" }).status(400);
    }

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Password mismatched!!!" }).status(400);
    }

    const payload = {
      user: {
        id: user._id,
        name: user.firstName,
      },
    };

    jwt.sign(
      payload,
      process.env.secret,
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }).status(200);
      }
    );
  } catch (error) {
    res.json({ message: "Your are not logged in!!!" }).status(400);
  }
};

//HTTP Get - Logout - to logout the user

exports.auth_logout_get = (req, res) => {
  //This will clear the session
  req.logout();
  req.flash("success", "You are successfully logged out");
  res.redirect("/auth/signin");
};
