const express = require("express")
const prandom = require("prandom");
const fs = require('fs')
const multer = require('multer')
const date = require("date-and-time");
const path = require('path');
const { auth } = require("../middleware/auth.middleware")
const { NewPanModel } = require("../model/newPan.model");
const { UpdatePanModel } = require("../model/updatePan/updatePan.model");
const { AllPaymentDetailsModel } = require("../model/allPaymentDetails.model");
const { UserModel } = require("../model/user.model");
const newPanRoute = express.Router()


//post new pan
newPanRoute.use(auth)
newPanRoute.post("/new-pan-card", async (req, res) => {
    const {userID,vendorID}=req.body
    try {
        const user=await UserModel.findOne({_id:userID})
        if(user.balance<107){
            res.send("Wallet balance is low please add balance!")
        }
        else{
            const now = new Date();
            req.body.dateAndTime= date.format(now, "YYYY/MM/DD HH:mm:ss")
            const tran=new AllPaymentDetailsModel({vendorID,userID,debit:107,dateAndTime:req.body.dateAndTime})
            await tran.save()
            // console.log(tran);
            await UserModel.findByIdAndUpdate({ _id: userID },{balance:Number(user.balance)-107});

            const tokenNumber = prandom.number(8);
            req.body.tokenNumber = tokenNumber
            const newPan = new NewPanModel(req.body)
            await newPan.save()
            res.send("Apply successful for new pan card")
        } 

    } catch (error) {
        res.send(error)
    }
})

//get all pan deatails under login user 
newPanRoute.use(auth)
newPanRoute.get("/all-pan-card-deatils", async (req, res) => {
    const { vendorID, userID } = req.body;
    const { category } = req.query

    try {
        if (category == "newPancard") {
            const pans = await NewPanModel.find({ $and: [{ vendorID: vendorID }, { isUpload: false }] })
            res.send(pans)
        }
        else if (category == "updatePancard") {
            const pans = await UpdatePanModel.find({ $and: [{ vendorID: vendorID }, { isUpload: false }] })
            res.send(pans)
        }



    } catch (error) {
        res.send(error)
    }
})

newPanRoute.get("/all-uploaded-pan-card", async (req, res) => {
    const { vendorID } = req.body;
    const { category } = req.query

    try {

        if (category == "newPancard") {

            const pans = await NewPanModel.find({ $and: [{ vendorID: vendorID }] })
            res.send(pans)
        }
        else if (category == "updatePancard") {
            const pans = await UpdatePanModel.find({ $and: [{ vendorID: vendorID }] })

            res.send(pans)
        }

    } catch (error) {
        res.send(error)
    }
})

//get one pan deatails under login user 
newPanRoute.get("/upload-pan-card/:id",auth, async (req, res) => {
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
newPanRoute.patch('/upload-pan-document/:id',auth, async (req, res) => {
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
newPanRoute.get('/final-confirm-apply/:id',auth, async (req, res) => {
    const { id } = req.params
    try {

        const user = await NewPanModel.findOne({ _id: id })
        res.send(user)

    } catch (error) {
        res.send(error)
    }
})

newPanRoute.patch('/apply-confirm-from/:id',auth, async (req, res) => {
    const { id } = req.params
    try {

        const user = await NewPanModel.findByIdAndUpdate({ _id: id }, { isDoneFromUser: true, isUpload: true })
        res.send('Apply Successfull')

    } catch (error) {
        res.send(error)
    }
})

//before upload pan edit api
newPanRoute.patch("/pan-edit/:id",auth, async (req, res) => {
    const { id } = req.params
    try {
        await NewPanModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send('Edit Successfull')
    } catch (error) {
        res.send(error)
    }
})
// only complete panstatus send

newPanRoute.get('/status-completed',auth, async (req, res) => {
    const { category } = req.query
    try {

        if (category == "newPancard") {

            const pans = await NewPanModel.find({ panStatus: "completed", vendorID: req.body.vendorID })
            res.send(pans)
        }
        else if (category == "updatePancard") {
            const pans = await UpdatePanModel.find({ panStatus: "completed", vendorID: req.body.vendorID })
            res.send(pans)
        }
    } catch (error) {
        res.send(error)
    }
})







module.exports = {
    newPanRoute
}