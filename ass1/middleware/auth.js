const jwt=require("jsonwebtoken");
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.KEY,(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId;
                next();
            }else{
                res.send({"msg":"Please Log In First"});
            }
        })
    }else{
        res.send({"msg":"Please Log In First"});
    }
}

module.exports={
    auth
}