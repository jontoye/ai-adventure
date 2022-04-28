const express = require("express");
const isLoggedIn = require("../helper/isLoggedIn");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.get("/users", isLoggedIn, userCtrl.user_index_get);

router.get("/profile/:userId", isLoggedIn, userCtrl.user_profile_get);

router.post(
  "/profile/:userId/biography",
  isLoggedIn,
  userCtrl.user_profile_biography_post
);
router.post(
  "/profile/:userId/addsocial",
  isLoggedIn,
  userCtrl.user_profile_addsocial_post
);
router.post(
  "/profile/:userId/removesocial",
  isLoggedIn,
  userCtrl.user_profile_removesocial_post
);
router.put(
  "/profile/:userId/avatar",
  isLoggedIn,
  userCtrl.user_profile_avatar_put
);

module.exports = router;
