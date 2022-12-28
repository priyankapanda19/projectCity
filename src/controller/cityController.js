
const cityModel=require("../model/cityModel")

const isValidCity=require("../valid/validation")


const createCity=async function(req,res){
try{
let cityName=req.body

if(isValidCity(req.body))

return res.status(300).send({status:false,message:"City name must be valid format"})

let city=await cityModel.findone({cityName})
if(city){
    return res.status(300).send({status:false,message:"city alredy present"})
}
const c=await cityModel.create(req.body)
return res.status(200).send({status:true,message:"city successfully created"})


}
catch(err){
    return res.status(500).send({status:false,message:err.message})
}


}


//get city name

const getCity=async function(req,res){
    try{

let city=req.body
if(city){
    if(!isValidCity(city)){
    return res.status(300).send({status:false,message:"city is not proper format"})
}
}
    
const data=await cityModel.find({cityName}.select({_id:0,cityName:1}))
if(data.length==0)return res.status(400).send({status:true,message:"no city found"})
return res.status(200).send({status:true,message:"sucess",data:data})
} 
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

module.exports.createCity=createCity
module.exports.getCity=getCity
