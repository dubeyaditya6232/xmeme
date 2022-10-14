var express = require("express");
var router = express.Router();
const { homepage } = require("../controllers/meme")
/* GET home page. */
router.get("/", homepage);

module.exports = router;
