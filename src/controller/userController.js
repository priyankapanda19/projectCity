const userModel=require("../model/userModel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const isValidUser=require("../valid/validation")

const passEncryption=async function(pass){
    let Encryptedpassword=await bcrypt.hash(pass,salt)
    return Encryptedpassword
}

//Create user
const createUser=async function(req,res){
try{
let UserName=req.body

if(isValidUser(UserName))

return res.status(300).send({status:false,message:"User name must be valid format"})

let user=await userModel.find({CityName})
if(user){
    return res.status(300).send({status:false,message:"user alredy present"})
}
let pass=await passEncryption(password)
req.body.password=pass



const c=await userModel.create(req.body)
return res.status(200).send({status:true,message:"user successfully created",data:c})


}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}

}

//Login user

const loginUser=async function(req,res){
    try{
        let phone=req.body
        if(isValidUser.isValidMobile(phone))return res.status(400).send({status:false,message:"Phone no is not valid"})


        let findUser=await userModel.findOne({mobileNo:mobileNo})
        if(!findUser)return res.status(400).send({status:false,message:"User not found"})
        let validPassword=await bcrypt.compare(password,findUser.password)
    if(!validPassword)return res.status(404).send({status:false,message:"Password is incorrect"})
    let token=jwt.sign(
       { userId:findUser._id},
        "Priy@nka19",{
            expiresIn:'1d'
        }
    )
    return res.status(201).send({status:false,message:"successfully login",data:{token:token}})
}
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

//Get user document
const getUser=async function(req,res){
    try{

let user=req.body
if(user){
    if(!isValidUser(user)){
    return res.status(300).send({status:false,message:"user is not proper format"})
}
}
    
const data=await userModel.find({userName}.select({_id:0,userName:1}))
if(data.length==0)return res.status(400).send({status:true,message:"no user found"})
return res.status(200).send({status:true,message:"success",data:data})
} 
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}


//Update user document
const updateUser=async function(req,res){
    try{
    let userId=req.params.userId

    let findUser=await userModel.findById(userId)
    let {username,city,mobile,url}=req.body
    if(isValidUser(username))
    
    return res.status(400).send({status:false,message:"User name must be valid format"})
    
    if(isValidCity(city))
    
    return res.status(400).send({status:false,message:"City name must be valid format"})
    
    if(isValidMobile(mobile))
    
    return res.status(400).send({status:false,message:"Mobile number must be valid format"})
    
    if(isValidUrl(url))
    
    return res.status(400).send({status:false,message:"Url  must be valid format"})
    
    let user=await userModel.findone({username})
    if(user){
        return res.status(400).send({status:false,message:"user alredy present"})
    }
    let dovUpded={username,city,mobile,url}
    
    
    const c=await userModel.findOneAndUpdate({_id:userId},{$set:dovUpded},{new:true})
    return res.status(200).send({status:true,message:"user successfully updated",data:c})
    
    
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
    
    }



module.exports.createUser=createUser
module.exports.getUser=getUser
module.exports.loginUser=loginUser
module.exports.updateUser=updateUser