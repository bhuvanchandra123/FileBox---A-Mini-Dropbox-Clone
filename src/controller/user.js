const validator = require("validator");
const bcrypt = require("bcrypt");
const jwtoken = require("jsonwebtoken");
const user = require("../model/user")
require('dotenv').config();

const registerUser = async (req, res)=>{
    const {email, password, name}  = req.body;
    if(!email || !password){
        return res.status(400).json({status: false, msg: "email and password is required"})
    }
    if(!validator.isEmail(email)){  // validating email 
        return res.status(400).json({status: false, msg: "this email is not valid"})
    }
    if(password < 8){   // checking password length have min 8 charectors
        return res.status(400).json({status: false, msg: "password must have minimum 8 charactors"})
    }
    const existEmail = await user.findOne({email})
    if(existEmail){
        return res.status(400).json({status: false, msg: "email already exist"})
    }
   try{
    const hashPassword = await bcrypt.hash(password, 10); // hashing password
    const newUser = await user.create({       // creating user
        name,
        email,
        password: hashPassword,
    })
    return res.status(201).json({status: true, msg: "cretaed successfully", data: {email: newUser.email, userId: newUser._id }})
   }catch(error){
     return res.status(500).json({ message: "Something went wrong", error })
   }    
}


const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({status: false, msg: "email and password is required"})
    }
    try{
        const existUser = await user.findOne({email}); //checking user exist or not
        if(!existUser){
          return res.status(400).json({status: false, message: "email not found"}) 
        }
        const isValidPassword = await bcrypt.compare(password, existUser.password) 
        console.log(isValidPassword)
        if(!isValidPassword){          // validating password
            return res.status(400).send({status: false, msg: "invalid password"})
         } 
       // jwtoken
        const jwt = jwtoken.sign( 
            {userId: existUser._id},
            process.env.JWT_SECRET,
        )  
      console.log(jwt)
        return res.status(200).json({status: true, data: jwt})
    }catch(error){
        return res.status(500).json({ message: "Something went wrong", error })
    }
}


module.exports = {registerUser, loginUser}
