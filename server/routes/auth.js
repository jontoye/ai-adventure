// const express = require("express");
// const router = express.Router();
//two statements in one
const router = require("express").Router();
const { body } = require("express-validator");

//import authentication controller
const authCntrl = require("../controllers/auth");

//routes for authentication
router.get("/auth/signup", authCntrl.auth_signup_get);
router.post(
  "/auth/signup",
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First Name must be at least 3 characters")
      .notEmpty()
      .withMessage("First name is required"),
    body("lastName").isLength({ min: 3 }),
    body("emailAddress").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  authCntrl.auth_signup_post
);

router.get("/auth/signin", authCntrl.auth_signin_get);
router.post("/auth/signin", authCntrl.auth_signin_post);

router.get("/auth/logout", authCntrl.auth_logout_get);

module.exports = router;
