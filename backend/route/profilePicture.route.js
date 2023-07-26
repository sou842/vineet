const express=require("express")
const { ProfilePictureModel } = require("../model/profilePicture.model")
const { auth } = require("../middleware/auth.middleware")
const profileRouter=express.Router()

//post profile picture
profileRouter.post("/profile-pictire",async(req,res)=>{

    try {
        let user= new ProfilePictureModel(req.body)
        await user.save()
        res.send("Profile Created")
    } catch (error) {
        res.send(error.message)
    }
})
//update profile picture
profileRouter.use(auth)
profileRouter.patch("/update-profile-pictire",async(req,res)=>{
    
    req.body.lastUpdate=new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).format(new Date())
    try {
        await ProfilePictureModel.findOneAndUpdate({vendorID:req.body.vendorID},req.body)
        res.send("Profile picture has been update")
    } catch (error) {
        res.send(error.message)
    }
})
//get profile picture
profileRouter.use(auth)
profileRouter.get("/profile-pictire",async(req,res)=>{
    try {
        const user=await ProfilePictureModel.findOne({vendorID:req.body.vendorID})
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})

module.exports={
    profileRouter
}