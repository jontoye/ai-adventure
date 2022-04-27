const express = require("express");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

const eventCtrl = require("../controllers/event");
router.get("/event/index", eventCtrl.event_index_get);
router.post("/event/add", eventCtrl.event_create_post);
router.put("/event/update", isLoggedIn, eventCtrl.event_update_put);

module.exports = router;