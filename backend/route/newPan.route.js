const express = require("express")
const prandom = require("prandom");
const fs = require('fs')
const multer = require('multer')
const path = require('path');
const { auth } = require("../middleware/auth.middleware")
const { NewPanModel } = require("../model/newPan.model")
const newPanRoute = express.Router()


//post new pan
newPanRoute.use(auth)
newPanRoute.post("/new-pan-card", async (req, res) => {
    try {
        const tokenNumber = prandom.number(8);
        req.body.tokenNumber = tokenNumber
        const newPan = await NewPanModel(req.body)
        await newPan.save()
        res.send("Apply successful for new pan card")

    } catch (error) {
        res.send(error)
    }
})

//get all pan deatails under login user 

newPanRoute.get("/all-pan-card-deatils", async (req, res) => {
    const { vendorID, userID } = req.body;

    try {
       
        const pans = await NewPanModel.find({ vendorID })
        res.send(pans)



    } catch (error) {
        res.send(error)
    }
})
//get one pan deatails under login user 

newPanRoute.get("/upload-pan-card/:id", async (req, res) => {
    const { id } = req.params

    try {
        const pans = await NewPanModel.findOne({ _id: id })
        res.send(pans)

    } catch (error) {
        res.send(error)
    }
})


// upload document under login user using multer 

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./public/documents')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
//     }
// })
// const upload=multer({
//     storage:storage
// })
// upload.single(<file name from frontend>)




//upload image data base

newPanRoute.patch('/upload-pan-document/:id', async (req, res) => {
    const { id } = req.params
    const { aadharCardDocs, frontForm, backForm } = req.body
    try {
        // await NewPanModel.updateMany({_id:id},{$push:{documents:{name:req.file.fieldname,image:req.file.filename}}})
        await NewPanModel.findByIdAndUpdate({ _id: id }, { aadharCardDocs, frontForm, backForm, isUploadDocs: true })
        res.send("Document upload succesfull")

    } catch (error) {
        res.send(error)
    }
})

// final confirm stem api

newPanRoute.get('/final-confirm-apply/:id', async (req, res) => {
    const { id } = req.params
    try {

        const user = await NewPanModel.findOne({ _id: id })
        res.send(user)

    } catch (error) {
        res.send(error)
    }
})


newPanRoute.patch('/apply-confirm-from/:id', async (req, res) => {
    const { id } = req.params
    try {

        const user = await NewPanModel.findByIdAndUpdate({ _id: id }, { isDoneFromUser: true })
        res.send('Apply Successfull')

    } catch (error) {
        res.send(error)
    }
})





module.exports = {
    newPanRoute
}