//dependencies
const express = require("express");
let methodOverride = require("method-override");
const isLoggedIn = require("../helper/isLoggedIn");
const router = express.Router();

router.use(express.json());
router.use(methodOverride("_method"));

//import author controller
const characterCtrl = require("../controllers/character");

//routes
router.post("/character/add", isLoggedIn, characterCtrl.character_create_post);
router.get("/character/index", isLoggedIn, characterCtrl.character_index_get);
router.delete(
  "/character/delete",
  isLoggedIn,
  characterCtrl.character_delete_get
); //requires method-override

//export router
module.exports = router;
