var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const { getUsers, login, register, getProfile, updateProfile } = require("../controllers/user");
const { verifyUser } = require("../middleware/authenticate")
/* GET users listing. */
router.get("/", getUsers);

router.post("/login", login);

router.post("/register", register);

router.get("/profile/:id", getProfile)

router.patch("/profile/:id", verifyUser, updateProfile)

module.exports = router;
