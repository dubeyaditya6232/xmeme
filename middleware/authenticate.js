const jwt = require('jsonwebtoken')

exports.verifyUser =(req,res,next) =>{
    const bearer =req.headers.authorization;
    if(bearer){
        const bearerToken =bearer.split(" ");
        const token=bearerToken[1];
        jwt.verify(token,"secretKey", (err,decoded) =>{
            if(err){
                res.status(401).json({message:"You are not authenticated"});
            }
            else{
            req.userData=decoded;
               //console.log(token);
                next();
            }
        });
    }else{
        res.status(401).json({message:"No login tokrn present"});
    }
}