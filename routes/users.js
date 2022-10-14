var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const { getUsers, login, register } = require("../controllers/routes");
/* GET users listing. */
router.get("/", getUsers);

router.post("/login", login);

router.post("/register", register);

module.exports = router;
