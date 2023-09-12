const User=require('../model/User')
const bcrypt=require('bcrypt')

 const registerHandler=async(req,res)=>{
    const {username,password,email}=req.body;
    if(!username || !password || !email) return res.status(400).json({'message':"Username, Password, email is required "})
    const duplicate=await User.findOne({email:email}).exec()
    if(duplicate) return res.sendStatus(409)
    try{
       const hashedPwd=await bcrypt.hash(password,10)

       const result=await User.create({
        "username":username,
        "roles":{"user":2001},
        "password":hashedPwd,
        "email":email
       })
       console.log(result);
       res.status(201).json({"Success":`New user ${username} created`});
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}

module.exports=registerHandler;
