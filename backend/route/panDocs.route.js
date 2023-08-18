const express=require("express")
const { panDocsModel } = require("../model/panDocs.model")
const {auth} =require('../middleware/auth.middleware')
const {upload}=require('../middleware/uploadDocs.middleware')
const { NewPanModel } = require("../model/newPan.model")
const panDocsRoute=express.Router()




//upolad docs
// panDocsRoute.use(auth)
panDocsRoute.post("/upload-pandocs",auth,upload.fields([
    
       { name:"form49Front"},
        {name:"form49Back"},
       { name:"aadharDoc"},
       { name:"parentAadharDoc"},
        
    
]),async(req,res)=>{
 
    const uploadedFiles = req.files;
    const panid=req.body.panid
    const receiptPdf=req.body.receiptPdf
    const vendorID=req.body.vendorID

    
    const newFile = new panDocsModel({
        panid: panid,
        receiptPdf: receiptPdf,
        form49Front:uploadedFiles['form49Front'][0].filename,
        form49Back:uploadedFiles['form49Back'][0].filename,
        aadharDoc:uploadedFiles['aadharDoc'][0].filename,
        parentAadharDoc:uploadedFiles['parentAadharDoc'] && uploadedFiles['parentAadharDoc'][0].filename,
        vendorID:vendorID
    });
    try {
        
        await newFile.save()
        await NewPanModel.findByIdAndUpdate({ _id:req.body.panid }, { isDoneFromUser: true, isUpload: true })


        res.send("Files uploaded and saved to database successfully")
    } catch (error) {
        res.send(error.message)
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
