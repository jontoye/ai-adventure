const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const userCtrl = require("../controllers/user");
router.get("/profile/:username", userCtrl.user_profile_get);
router.get("/profile/:username/edit", userCtrl.user_edit_get);
router.post("/profile/:username/edit", userCtrl.user_edit_post);
router.get("/profile/:username/delete", userCtrl.user_delete_get);

module.exports = router;