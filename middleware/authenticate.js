const jwt = require('jsonwebtoken')

exports.verifyUser =(req,res,next) =>{
    const bearer =req.headers.authorization;
    if(bearer){
        // const bearerToken =bearer.split(" ");
        // const token=bearerToken[1];
        console.log(bearer);
        const token = bearer.slice(7);
        console.log(token);
        jwt.verify(token,"secretKey", (err,decoded) =>{
            if(err){
                res.status(401).json({message:"User not authenticated!"});
            }
            else{
            req.userData=decoded;
                next();
            }
        });
    }else{
        res.status(401).json({message:"Login token not found!"});
    }
}