const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const eventCtrl = require("../controllers/event");
router.get("/event/index", eventCtrl.event_index_get);
router.post("/event/add", eventCtrl.event_create_post);

module.exports = router;