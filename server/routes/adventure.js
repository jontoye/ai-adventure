const express = require("express");
let methodOverride = require("method-override");
const isLoggedIn = require('../helper/isLoggedIn');
const router = express.Router();

router.use(express.json());
router.use(methodOverride('_method'));

const adventureCtrl = require("../controllers/adventure");
router.get("/adventure/index", adventureCtrl.adventure_index_get);
router.post("/adventure/add", adventureCtrl.adventure_create_post);
router.delete("/adventure/delete", adventureCtrl.adventure_delete_get);
router.put("/adventure/update", isLoggedIn, adventureCtrl.adventure_update_put);

module.exports = router;