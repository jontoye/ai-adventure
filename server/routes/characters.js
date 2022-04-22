//dependencies
const express = require("express");
const isLoggedIn = require("../helper/isLoggedIn");
const router = express.Router();

router.use(express.json());

//import author controller
const characterCtrl = require("../controllers/character");

//routes
router.post("/character/add", isLoggedIn, characterCtrl.character_create_post);

//export router
module.exports = router;
