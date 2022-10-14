var express = require("express");
var router = express.Router();
var memes = require("../model/meme");
const authenticate = require("../middleware/authenticate");
const {
  getMemes,
  postMeme,
  getMemeById,
  patchMemeById,
  deleteMemeById,
} = require("../controllers/routes");
var d = [];
router.get("/", authenticate.verifyUser, getMemes);
router.post("/", authenticate.verifyUser, postMeme);
router.get("/:memeId", authenticate.verifyUser, getMemeById);
router.patch("/:memeId", authenticate.verifyUser, patchMemeById);
router.delete("/:memeId", authenticate.verifyUser, deleteMemeById);
module.exports = router;
