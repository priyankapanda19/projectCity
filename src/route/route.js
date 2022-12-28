const express=require("express")
const router=express.Router()
const createCity=require("../controller/cityController")
const createUser=require("../controller/userController")
const {Authentication,Authorization}=require("../auth/authentication")





router.post("/createCity",Authentication,Authorization,createCity.createCity)
router.get("/getCity",Authentication,Authorization,createCity.getCity)


router.post("/createUser",createUser.createUser)
router.post("/login",createUser.loginUser)
router.get("/getUser",Authentication,Authorization,createUser.getUser)
router.put("/updateUser",Authentication,Authorization,createUser.updateUser)


router.all("/**",function(req,res){
    res.send(400).send({
        status:false,
        msg:"API request is not available"
    })
})

module.exports=router