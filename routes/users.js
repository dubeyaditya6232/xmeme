var express = require('express');
var router = express.Router();
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

    if(user.password===password){
      res.statusCode=400;
      return res.json({message:"Email and password not match",data:null})
    }
    res.status(200);
    return res.json({message:"success",data:user});
  }
  catch(err){
    return res.json({message:err.message,data:null});
  }
});

module.exports = router;
