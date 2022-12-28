
const mongoose=require("mongoose")

const isValidCity=(city)=>{
    return  /^[a-zA-Z\.]$/.test(city)
}

const isValidUser=(user)=>{
    return  /^[a-zA-Z\.]$/.test(user)
}


const isValidMobile=(mobile)=>{
    return  /^[0-9]{10}$/.test(mobile)
}
const isValidUrl=(url)=>{
    return  /^[https://\.]$/.test(url)
}

const isValidUserId=(ObjectId)=>{
    return mongoose.Types.ObjectId.isValid(ObjectId)
}


module.exports={
    isValidCity,isValidMobile,isValidUrl,isValidUser,isValidUserId
}