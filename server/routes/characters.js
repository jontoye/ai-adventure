const express = require("express");
const isLoggedIn = require("../helper/isLoggedIn");

const router = express.Router();

// router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//import author controller
const characterCntrl = require("../controllers/character");

router.post("/character/add", isLoggedIn, characterCntrl.character_create_post);


module.exports = router;