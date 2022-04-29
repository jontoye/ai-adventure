//APIS for Authentication
// const { User } = require("../models/User");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const GoogleUser = require("../models/GoogleUser.js");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
  // check if password length is greater than 6
  if (req.body.password.length < 6) {
    res
      .json({ message: "Password must be at least 6 characters long." })
      .status(400);
    return;
  }

  let user = new User(req.body);

  // console.log(req.body);
  let hash = bcrypt.hashSync(req.body.password, salt);
  // console.log(hash);
  user.password = hash;

  user
    .save()
    .then(() => {
      // res.redirect("/auth/signin");
      res.json({ message: "User created successfully!" }).status(200);
    })
    .catch((err) => {
      // console.log(err)
      if (err.code == 11000) {
        // req.flash("error", "Email is already in use");
        // res.redirect("/auth/signin");
        if (Object.keys(err.keyValue).includes("username")) {
          res.json({ message: "Username already exists." }).status(400);
        } else if (Object.keys(err.keyValue).includes("emailAddress")) {
          res.json({ message: "Email address already exists." }).status(400);
        } else {
          res
            .json({
              message:
                "Username or email already exists. Please choose a new one.",
            })
            .status(400);
        }
      } else {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          // req.flash("validationErrors", errors.errors);
          res
            .json({
              message: "Validation Errors",
              ValidationErrors: errors.errors,
            })
            .status(400);
        }
        // res.redirect("/auth/signup");
        if (err.errors.username) {
          res
            .json({ message: err.errors.username.properties.message })
            .status(400);
        } else if (err.errors.emailAddress) {
          res
            .json({ message: err.errors.emailAddress.properties.message })
            .status(400);
        } else if (err.errors.password) {
          res
            .json({ message: err.errors.password.properties.message })
            .status(400);
        } else
          res
            .json({ message: "Error creating user. Please try again later." })
            .status(400);
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

    jwt.sign(
      {
        id: user._id,
        name: user.username,
        email: user.emailAddress,
      },
      process.env.SECRET,
      { expiresIn: "7d" },
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

exports.googleLoginPost = (req, resp) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    .then((res) => {
      const { email_verified, name, email } = res.payload;
      console.log({ email_verified, name, email });
      if (email_verified) {
        User.findOne({ emailAddress: email }).exec((err, user) => {
          if (err) {
            return resp.json({
              error: "Something went wrong...",
            });
          } else {
            if (user) {
              const token = jwt.sign(
                {
                  id: user._id,
                  name: user.username,
                  email: user.emailAddress,
                },
                process.env.SECRET,
                {
                  expiresIn: "7d",
                }
              );
              const { _id, username, emailAddress } = user;

              return resp.json({
                token,
                user: { _id, username, emailAddress },
              });
            } else {
              let password = email + process.env.SECRET;
              let newUser = new User({
                username: name,
                emailAddress: email,
                password: password,
              });
              let hash = bcrypt.hashSync(password, salt);
              newUser.password = hash;
              newUser.save((err, data) => {
                if (err) {
                  return resp.json({
                    error: "Something went wrong...",
                  });
                }
                const token = jwt.sign(
                  {
                    id: data._id,
                    name: data.username,
                    email: data.emailAddress,
                  },
                  process.env.SECRET,
                  {
                    expiresIn: "7d",
                  }
                );
                // this is a comment
                const { _id, username, emailAddress, password } = newUser;

                return resp.json({
                  token,
                  user: { _id, username, emailAddress, password },
                });
              });
            }
          }
        });
      }
    });
};
