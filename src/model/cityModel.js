const mongoose=require("mongoose")


const citySchema=new mongoose.Schema({
CityName:{
    type:String,
    require:true,
    unique:true
}

})



module.exports=mongoose.model('city100',citySchema)
