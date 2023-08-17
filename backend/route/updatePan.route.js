const express= require("express")
const { UpdatePanModel } = require("../model/updatePan/updatePan.model")
const { auth } = require("../middleware/auth.middleware")
const updatePanRoute=express.Router()


updatePanRoute.use(auth)
updatePanRoute.post("/pan-update",async(req,res)=>{
    try {
        const pans=new UpdatePanModel(req.body)
        await pans.save()
        res.send("You are send request for update pancard successfully.")
        
    } catch (error) {
        res.send(error)
    }
})



module.exports={
    updatePanRoute
}