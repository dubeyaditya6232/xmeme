var express = require("express");
var router = express.Router();
const { homepage } = require("../controllers/routes");
/* GET home page. */
router.get("/", homepage);

module.exports = router;
