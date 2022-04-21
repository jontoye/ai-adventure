const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const eventCtrl = require("../controllers/event");
router.get("/detail", eventCtrl.event_detail_get);

module.exports = router;