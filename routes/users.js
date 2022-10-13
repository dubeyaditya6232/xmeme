var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Users=require('../model/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',async (req, res, next)=> {
  try{
    let {email,password}= req.body;
    const user= await Users.findOne({email});
    if(!user){
      res.statusCode=404;
      return res.json({message:"User not Found",data:null});
    }

    const matched = await bcrypt.compare(password, user.password);
    if(!matched){
      res.statusCode=400;
      return res.json({message:"Email and password not match",data:null})
    }
    token = jwt.sign({ _id: user._id,email }, "secretKey",{expiresIn:3600});
    res.status(200);
    return res.json({message:"success",data:user,token});
  }
  catch(err){
    return res.json({message:err.message,data:null});
  }
});

router.post('/register',async (req, res, next)=> {
  try{
    let {email,name,password}= req.body;
    const user= await Users.findOne({email});

    if(user){
      res.statusCode=409;
      return res.json({message:"User already exists",data:null});
    }
    else{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new Users({name,email,password: hashedPassword})
      const data = await newUser.save();
      res.statusCode= 200;
      return res.json({message:"Success! User added!",data});
    }
  }
  catch(err){
    return res.json({message:err.message,data:null});
  }
});

module.exports = router;
