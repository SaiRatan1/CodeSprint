const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const authenticate = async (req,res,next)=>{
    try{

        const token = req.cookies.access_token;

        if(!token){
            throw new Error("User not found")
        }
        const verify = jwt.verify(token,process.env.LEETCODE)
        
        
        const rootUser = await User.findOne({_id:verify._id, "tokens.token":token})
        
        if(!rootUser){
            throw new Error("User not found")
        }
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        
        next()
    }
    catch(error){
        // console.log(error);
        res.status(401).json({message:"Unautherized user"})

    }

}

module.exports = authenticate