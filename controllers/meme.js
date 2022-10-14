var express = require("express");
var router = express.Router();
var memes = require("../model/meme");
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
    counter: 0
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
      $inc: { counter: 1 }
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
