const express = require("express");
const isLoggedIn = require("../helper/isLoggedIn");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.get("/users", userCtrl.user_index_get);
// router.get("/users/:userId", userCtrl.user_info_get);

router.get("/profile/:userId", userCtrl.user_profile_get);
router.post("/profile/:userId/addsocial", userCtrl.user_profile_addsocial_post);
router.post(
  "/profile/:userId/removesocial",
  userCtrl.user_profile_removesocial_post
);

router.get("/profile/:username/edit", userCtrl.user_edit_get);
router.post("/profile/:username/edit", userCtrl.user_edit_post);
router.get("/profile/:username/delete", userCtrl.user_delete_get);

module.exports = router;
