const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const adventureCtrl = require("../controllers/adventure");
router.get("/home", adventureCtrl.adventure_index_get);

module.exports = router;