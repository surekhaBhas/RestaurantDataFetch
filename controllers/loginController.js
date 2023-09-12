const User = require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config()

const handleLogin=async(req,res)=>{
    const {username,password,email}=req.body;
    if(!username || !password || !email) return res.status(400).json({"message":"Username and password and email required"})
    const foundUser= await User.findOne({email:email}).exec()
    if (!foundUser) return res.sendStatus(401)
    const match=await bcrypt.compare(password,foundUser.password)
    if(match){
        const roles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken=jwt.sign(
            {"UserInfo": {
                "email": foundUser.email,
                "roles": roles
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'})
            
        const refreshToken=jwt.sign(
            {"email":foundUser.email},
            process.env.REFRESH_TOKEN_SECRET
            ,{expiresIn:"1d"}
            )
           foundUser.refreshToken=refreshToken;
           const result=await foundUser.save();
           console.log(result)
           res.cookie('jwt',refreshToken,{httpOnly:true,sameSite: 'None', secure: true,maxAge:24*60*60*1000})
           res.json({roles,accessToken})
    }else{
        res.sendStatus(401)
    }

}

module.exports=handleLogin