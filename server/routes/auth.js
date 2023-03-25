// const express = require("express");
// const router = express.Router();
//two statements in one
const router = require("express").Router();
const { application } = require("express");
const { body } = require("express-validator");
const passport = require("passport");
const {OAuth2Client} = require("google-auth-library")
const jwt = require("jsonwebtoken");
require('../helper/ppConfig.js')
const GoogleUser = require("../models/GoogleUser.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
//import authentication controller
const authCtrl = require("../controllers/auth");
const User = require("../models/User.js");

//routes for authentication
// router.get("/auth/signup", authCtrl.auth_signup_get);
router.post(
  "/auth/signup",
  // [
  //   body("username").isLength({ min: 3 }).notEmpty().withMessage("Username is required"),
  //   body("emailAddress").isEmail().notEmpty().withMessage("Email address is required"),
  //   body("password").isLength({ min: 5 }).notEmpty().withMessage("Password is required"),
  // ],
  authCtrl.auth_signup_post
);

// router.get("/auth/signin", authCtrl.auth_signin_get);
router.post("/auth/signin", authCtrl.auth_signin_post);

// router.get("/auth/logout", authCtrl.auth_logout_get);





router.get('/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']})
)

router.post('/auth/google', authCtrl.googleLoginPost)

router.get('/google/callback',
passport.authenticate('google', {
  successRedirect: '/wedidit',
  failureRedirect: '/google/failure',
})
)

router.get('/google/failure', (req,res)=>{
  res.send('something went wrong')
})

router.get('/wedidit', (req,res)=>{
  console.log(req.user)
  res.send(req.user)
  
  // console.log(req.data)
  // res.send(req.user)
})

module.exports = router;
