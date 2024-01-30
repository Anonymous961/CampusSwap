const jwt=require('jsonwebtoken');
const User=require("../models/userModel")

const requireAuth=async(req,res,next)=>{
    const {authorization}=req.headers;

    if(!authorization){
        return res.status(401).json({error:"Authorization token required"});
    }

    const token=authorization.split(" ")[1];

    try {
        const {_id}=jwt.verify(token,process.env.SECRET);
        req.user=await User.findOne({_id}).select("_id");
        next();
    } catch (err) {
        console.error(err.message)
        res.status(401).json({error:"request is not authorized"});
    }
}

module.exports=requireAuth;