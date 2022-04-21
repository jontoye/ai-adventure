// const express = require("express");
// const router = express.Router();
//two statements in one
const router = require("express").Router();
const { body } = require("express-validator");

//import authentication controller
const authCtrl = require("../controllers/auth");

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

module.exports = router;
