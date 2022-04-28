const express = require("express");
const isLoggedIn = require("../helper/isLoggedIn");
const router = express.Router();

const feedbackCtrl = require("../controllers/feedback");

router.post("/feedback", feedbackCtrl.feedback_create_post);
router.get("/feedback", feedbackCtrl.feedback_index_get);

module.exports = router;
