const jwt=require("jsonwebtoken")
const dotenv=require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const genreteToken=(userId)=>{
    const token=jwt.sign({userId},SECRET_KEY,{expiresIn:"24h"});
    return token;
}

const getUserIdFromToken=(token)=>{
    const decodedToken=jwt.verify(token,SECRET_KEY);
    return decodedToken.userId;
}

module.exports={genreteToken,getUserIdFromToken}