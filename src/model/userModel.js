const mongoose=require("mongoose")
const ObjectId=mongoose.Types.ObjectId

const userSchema=new mongoose.Schema({
userName:{
    type:String,
    require:true,
    
},
city:{
    type:ObjectId,
    require:true
   
    
},
mobileNo:{
    type:String,
    unique:true

},
password:{
    type:String
},
mediaUrl:String

})

module.exports=mongoose.model('user100',userSchema)