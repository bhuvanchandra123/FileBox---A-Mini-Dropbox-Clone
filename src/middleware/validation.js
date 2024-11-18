const jwtoken = require("jsonwebtoken")
const File = require("../model/file")


const authentication = async (req, res, next)=>{
     const authheader = req.headers['authorization'];
     const jwt = authheader && authheader.split(' ')[1]
     if(!jwt){
        return res.status(400). json({status: false, message: "token missing or invalid"})
     }
    try{
      await jwtoken.verify(jwt, process.env.JWT_SECRET, (err, user)=>{
         if(err){
           return res.status(403).send({message:'Invalid token' });
         }
         req.user = user;
         next()
      })
    }catch(error){
       return res.status(500).json({status: false, error: "server error"})
    }
}


const authorization = async (req, res, next)=>{
      try{
        const fileId = req.params.fileId;
        const userId = req.user.userId;
        const file = await File.findById(fileId)
         if(!file){
            return res.status(400).json({status: false, message: "file not found"})
         }
         if(file.userId.toString() !== userId){
            return res.status(403).json({message: "You are not authorized to perform this action"});
         }
         next()
      }catch(error){
        return res.status(500).json({status: false, error: "server error"})
      }
}


module.exports = {authentication, authorization}