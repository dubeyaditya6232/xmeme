var express = require("express");
var router = express.Router();
var memes = require("../model/meme");
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const Users = require("../model/users");
const bcrypt = require("bcrypt");
var d = [];

exports.homepage = (req, res, next) => {
  res.redirect("/memes");
};

exports.getMemes = async (req, res, next) => {
  //handles the page when /memes endpoint is called
  try {
    const data = await memes.find({}).sort({ _id: -1 }).limit(100).exec();
    res.statusCode = 200;
    res.render("memes", { data: data, size: data.length });
    // return res.status(200).json({ memes: data });
  } catch (err) {
    console.log(err);
  }
};

exports.postMeme = async (req, res, next) => {
  // handles the post request upon the endpoint /memes
  const { name, caption, url } = req.body;
  const newMemes = new memes({
    //creating new meme
    name,
    caption,
    url,
  });
  try {
    const duplicate = await memes.findOne(req.body);
    if (duplicate) {
      return res.status(409).json({ message: "This meme already exists" });
    } else {
      newMemes.save((err, data) => {
        // saving the newly created meme in database
        if (err) {
          console.log(err);
        } else {
          res.statusCode = 200;
          res.redirect("/memes");
          // return res.json({
          //   message: "successfully created meme",
          //   data: data,
          // });
        }
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.getMemeById = async (req, res, next) => {
  // handles the get request on /meme/<id> endpoint
  try {
    const data = await memes.findById(req.params.memeId);
    if (data) {
      // meme exists
      d.length = 0; // empty the array d
      d.push(data); // adding the meme in array d
      res.statusCode = 200;
      res.render("display", { data: d, size: 1 }); // passing the array to frontend
      // return res.json({ message: "meme found", data: data });
    } else {
      return res.status(404).json({ message: "Meme not found" });
    }
  } catch (err) {
    return next(err);
  }
};

exports.patchMemeById = async (req, res, next) => {
  //handles the PATCH request on the endpoint /memes/<id>
  const { caption, url } = req.body;
  try {
    await memes.findByIdAndUpdate(req.params.memeId, {
      $set: { caption, url },
    });
    res.statusCode = 200;
    res.redirect("/memes");
  } catch (err) {
    console.log(err);
  }
};

exports.deleteMemeById = async (req, res, next) => {
  //handles the DELETE request on the endpoint /memes/<id>
  try {
    const deletedDoc = await memes.findByIdAndDelete(req.params.memeId);
    if (deletedDoc) {
      res.statusCode = 200;
      res.redirect("/memes");
    } else {
      return res.status(404).json({ message: "Meme doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUsers = (req, res, next) => {
  res.send("respond with a resource");
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.statusCode = 404;
      return res.json({ message: "User not Found", data: null });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      token = jwt.sign({ _id: user._id, email }, "secretKey", {
        expiresIn: 3600,
      });
      res.status(200);
      return res.json({ message: "success", data: user, token });
    } else {
      res.statusCode = 400;
      return res.json({ message: "Email and password not match", data: null });
    }
  } catch (err) {
    return res.json({ message: err.message, data: null });
  }
};

exports.register = async (req, res, next) => {
  try {
    let { email, name, password } = req.body;
    const user = await Users.findOne({ email });

    if (user) {
      res.statusCode = 409;
      return res.json({ message: "User already exists", data: null });
    } else {
      const newUser = new Users({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const data = await newUser.save();
      res.statusCode = 200;
      return res.json({ message: "Success! User added!", data });
    }
  } catch (err) {
    return res.json({ message: err.message, data: null });
  }
};
