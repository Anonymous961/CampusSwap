const jwt=require("jsonwebtoken")

const getUserId=(t)=>{
    let token=t.split(" ")[1];
    const tokenObject=jwt.decode(token);
    return tokenObject._id;
}

module.exports=getUserId;