const express=require("express")
const mongoose=require("mongoose")
const route=require("./route/route")
const app=express()

app.use(express.json())

mongoose.connect("mongodb+srv://Priyanka19:G8reXRlHUbBX65ev@plutonium01.9fxu8wj.mongodb.net/cityDatabase",{
    useNewUrlParser:true
})
.then(()=>console.log("mongodb is connect"))
.catch((err)=>console.log(err.message))


app.use("/",route)

app.listen(3000,()=>{
    console.log("Express is running")
})