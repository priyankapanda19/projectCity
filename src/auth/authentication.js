const JWT=require("jsonwebtoken")
const userModel=require("../model/userModel")



const Authentication=async (req,res,next)=>{
    try{
let token=req.header.authorization
if(!token)return res.status(401).send({status:false,message:"Token is missing"})
let user=token.split(" ")
JWT.verify(user[1],"Priy@nka19",(error,decodedToken)=>{
    if(error)return res.status(400).send({status:false,message:error.message})
    req.userId=decodedToken.userId
    next()
})
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
    
}

const Authorization=async(req,res,next)=>{
    try{
        let userId=req.query.userId
        if(!isValidUserId(userId))return res.status(404).send({status:false,message:"user id is not valid"})
        let checkUser=await userModel.findById(userId)
        if(userId!=req.userId)return res.status(403).send({status:false,message:"user not authorised"})
        req.checkUser=checkUser
        next()
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
    
}

module.exports={Authentication,Authorization}