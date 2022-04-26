const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const eventCtrl = require("../controllers/event");
router.get("/detail", eventCtrl.event_detail_get);
router.post("/event/add", eventCtrl.event_create_post);

module.exports = router;