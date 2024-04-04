const jwt=require('jsonwebtoken');
const UserMongo=require("../models/userModel")
const User=require("../models/user.sql")

const requireAuth=async(req,res,next)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"});
    }

    const token=authorization.split(" ")[1];

    try {
        const {_id}=jwt.verify(token,process.env.SECRET);
        // req.user=await User.findOne({_id}).select("_id");
        const user=await User.findOne({where:{id:_id}});
        // console.log(user);
        req.user=user.dataValues;
        next();
    } catch (err) {
        console.error(err.message)
        res.status(405).json({error:"request is not authorized"});
    }
}

module.exports=requireAuth;