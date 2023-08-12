const express=require("express")
const { panDocsModel } = require("../model/panDocs.model")
const {auth} =require('../middleware/auth.middleware')
const panDocsRoute=express.Router()


//upolad docs
panDocsRoute.use(auth)
panDocsRoute.post("/upload-pandocs",async(req,res)=>{
    try {
        const docs= new panDocsModel(req.body)
        await docs.save()
        res.send("Upload successfull")
    } catch (error) {
        res.send(error)
    }
})

// is upload read user docs
panDocsRoute.get("/upload-pandocs/:id",async(req,res)=>{
    const {id}=req.params
    try {
       const user= await panDocsModel.findOne({userid:id})
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})
//download reciept
panDocsRoute.get("/recipt-download/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const recipt=await panDocsModel.findOne({userid:id})
        res.send(recipt.receiptPdf)
        
    } catch (error) {
        res.send(error)
    }
})


module.exports={
    panDocsRoute
}
