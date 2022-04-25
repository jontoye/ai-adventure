const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const adventureCtrl = require("../controllers/adventure");
router.get("/adventure/index", adventureCtrl.adventure_index_get);
router.post("/adventure/add", adventureCtrl.adventure_create_post);

module.exports = router;