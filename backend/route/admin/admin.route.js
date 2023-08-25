const express = require("express")
const { AdminUserModel } = require("../../model/admin/adminuser.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NewPanModel } = require("../../model/newPan.model");
const { adminAuth } = require("../../middleware/adminAuth.middleware");
const { UserModel } = require("../../model/user.model");
const { panDocsModel } = require("../../model/panDocs.model");
const { UpdatePanModel } = require("../../model/updatePan/updatePan.model");
const { AllPaymentDetailsModel } = require("../../model/allPaymentDetails.model");
const { upload } = require("../../middleware/uploadDocs.middleware");
const adminRoute = express.Router()
const {mobileRechargeModel} = require('../../model/mobileRechargeModel/mobileRechargeModel.js')
const {DTHRechargeModel} = require('../../model/DTHRechargeModel/DTHRechargeModel.js')

//admin register
adminRoute.post("/register", async (req, res) => {
  const { adminName, name, email, password } = req.body
  try {

    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const admin = new AdminUserModel({ email, adminName, password: hash })
        await admin.save()
        res.send("Admin user created")
      }
    })
  } catch (error) {
    res.send(error)
  }
})

//admin login
adminRoute.post("/login", async (req, res) => {
  const { email, password } = req.body
  const user = await AdminUserModel.findOne({ email });
  if (user) {
    try {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { adminName: user.adminName, adminID: user._id },
            "adminvdp"
          );
          res.send({
            msg: "login successful",
            token: token,
            username: user.adminName,
          });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send({ msg: "Admin not found!" });
  }

})


//find all user
//adminRoute.use(adminAuth)
adminRoute.get("/all-login-user", async (req, res) => {
  const { page } = req.query
  try {
    const count= await UserModel.count()
    const user = await UserModel.find().sort({ _id: -1 }).skip(10*(page-1)).limit(10);
    res.json({user:user,count:count})
  } catch (error) {
    res.send(error.messege)
  }
})
//find all pan
//adminRoute.use(adminAuth)
adminRoute.get("/all-pan", async (req, res) => {
  const { page } = req.query;
  try {
    const count= await NewPanModel.count()
    const pans = await NewPanModel.find().sort({ _id: -1 }).skip(10*(page-1)).limit(10);
    res.json({data:pans,count:count})
  } catch (error) {
    res.send(error.messege)
  }
})


adminRoute.get("/category-pan", async (req, res) => {
  const { category,status,page,isDone,name } = req.query
  try {
    if(category && status && isDone){
      const count= await NewPanModel.count({ category, panStatus:status,isDoneFromUser:isDone })
      const pans = await NewPanModel.find({ category ,panStatus:status,isDoneFromUser:isDone}).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})

    }
    else if(category && status){
      const count= await NewPanModel.count({ category, panStatus:status })
      const pans = await NewPanModel.find({ category ,panStatus:status}).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(category && isDone){
      const count= await NewPanModel.count({ category,isDoneFromUser:isDone })
      const pans = await NewPanModel.find({ category ,isDoneFromUser:isDone}).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(status && isDone){
      const count= await NewPanModel.count({  panStatus:status,isDoneFromUser:isDone  })
      const pans = await NewPanModel.find({ panStatus:status,isDoneFromUser:isDone }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
   else if (category) {
      const count= await NewPanModel.count({ category })
      const pans = await NewPanModel.find({ category }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(status){
      const count= await NewPanModel.count({ panStatus:status })
      const pans = await NewPanModel.find({ panStatus:status }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(isDone){
      const count= await NewPanModel.count({ isDoneFromUser:isDone })
      const pans = await NewPanModel.find({ isDoneFromUser:isDone }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(name){
      const count=await NewPanModel.count({ NameOnCard: { $regex: name,$options: 'i' } })
      const pans=await NewPanModel.find({ NameOnCard: { $regex: name,$options: 'i' } }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else {
      const count= await NewPanModel.count()
      const pans = await NewPanModel.find().sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
  } catch (error) {
    res.send(error.messege)
  }
})
adminRoute.get("/individual-pan/:id", async (req, res) => {
  const { id } = req.params

  try {
    const pans = await NewPanModel.findOne({ _id: id })
    const docs=await panDocsModel.findOne({panid:id})
    res.json({pans:pans,docs:docs})
  } catch (error) {
    res.send(error.messege)
  }
})

adminRoute.get('/current-user', async (req, res) => {
  try {
    const user = await UserModel.find()
    res.send(user)

  } catch (error) {
    res.send(error)
  }
})
adminRoute.get('/top3-letest-user', async (req, res) => {
  try {
    const top3_latest_user = await UserModel.find().sort({_id:-1}).limit(3)
    res.send(top3_latest_user)

  } catch (error) {
    res.send(error)
  }
})

//single user profile data
adminRoute.get("/user-profile-data/:vendorID",async(req,res)=>{
  const {vendorID}=req.params
  try {
    const user=await UserModel.findOne({vendorID})
    res.send(user)
    
  } catch (error) {
    res.send(error)
  }
})


//under one user all pancards
adminRoute.get("/user/pancards/:vendorID",async(req,res)=>{
  const {vendorID}=req.params
  try {
    const pans=await NewPanModel.find({vendorID})
    res.send(pans)
    
  } catch (error) {
    res.send("error")
  }
})

//pan docs get perticular page
adminRoute.get("/user/pandocs",async(req,res)=>{
  const {userid,vendorID}=req.body
  try {
    const pandocs=await panDocsModel.findOne({userid,vendorID})
    res.send(pandocs)
    
  } catch (error) {
    res.send(error)
  }
})


// update status change and slip generate of pan card 
adminRoute.patch("/user/status-change/:id",upload.single('receiptPdf'), async(req,res)=>{
  const {slipGenerateDate,acknowledgement,panStatus}=req.body
  const {id}=req.params
  try {
    await NewPanModel.findByIdAndUpdate({_id:id},{slipGenerateDate,acknowledgement,panStatus})
    await panDocsModel.findOneAndUpdate({panid:id},{receiptPdf:req.file.filename})
    res.send("Update Succesfull")
    
  } catch (error) {
    res.send(error)
  }
})





// search user by defferent type
adminRoute.get("/user",async(req,res)=>{
  const{email}=req.query
  const{vendorID}=req.query
  const{aadharNumber}=req.query
  const{name}=req.query

  try {
    if(email){
      const user=await UserModel.find({email})
      res.send(user)
    }
    else if(vendorID){
      const user=await UserModel.find({vendorID})
      res.send(user)
    }
    else if(aadharNumber){
      const user=await UserModel.find({aadharNumber})
      res.send(user)
    }
    else if(name){
      const user=await UserModel.find({name})
      res.send(user)
    }
    else{
      const user=await UserModel.find()
      res.send(user)
    }
    
  } catch (error) {
    
  }
  
})
//update pans get
adminRoute.get("/update-pan",async(req,res)=>{
  const {status,page,isDone,name } = req.query
  try {
     if(status && isDone){
      const count= await UpdatePanModel.count({  panStatus:status,isDoneFromUser:isDone  })
      const pans = await UpdatePanModel.find({ panStatus:status,isDoneFromUser:isDone }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(status){
      const count= await UpdatePanModel.count({ panStatus:status })
      const pans = await UpdatePanModel.find({ panStatus:status }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(isDone){
      const count= await UpdatePanModel.count({ isDoneFromUser:isDone })
      const pans = await UpdatePanModel.find({ isDoneFromUser:isDone }).sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else if(name){
      const count=await UpdatePanModel.count({ NameOnCard: { $regex: name,$options: 'i' } })
      const pans=await UpdatePanModel.find({ NameOnCard: { $regex: name,$options: 'i' } }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }
    else {
      const count= await UpdatePanModel.count()
      const pans = await UpdatePanModel.find().sort({ _id: -1 }).skip(10*(page-1)).limit(10);
      res.json({data:pans,count:count})
    }

  } catch (error) {
    res.send(error)
  }
})

//singles update pans data
adminRoute.get('/pan-update-single/:id',async(req,res)=>{
  const {id}=req.params
  try {
      const pan= await UpdatePanModel.findOne({_id:id})
      res.send(pan)
      
  } catch (error) {
      res.send(error)
  }
})

adminRoute.get('/user-documents/:id',async(req,res)=>{
  try {
    const docs=await panDocsModel.findOne({panid:id})
    res.send(docs)
    
  } catch (error) {
    res.send(error)
  }
})


adminRoute.get("/user/all-transaction",async(req,res)=>{
  const {vendorID}=req.query
  try {
    if(vendorID){
      const trans=await AllPaymentDetailsModel.find({ vendorID: { $regex: vendorID,$options: 'i' } })
      res.send(trans)

    }
    else{

      const trans=await AllPaymentDetailsModel.find().sort({ _id: -1 })
      res.send(trans)
    }
    
  } catch (error) {
    res.send(error)
  }
})


// adminRoute.get('/total-payment',async(req,res)=>{
//   try {
//     const totalCredit=await AllPaymentDetailsModel.aggregate([
//       {
//         $group: { _id: null, totalCredit: { $sum: "$credit" } }
//      }
//     ]).toArray()
//     res.send(totalCredit)
    
//   } catch (error) {
    
//   }
// })

adminRoute.get('/admin_mobile_recharge',async(req,res)=>{
    
  try{
    const mobile = await mobileRechargeModel.find().sort({ _id: -1 })
    res.status(200).json({msg:'All Mobile Recharge Data',mobile})
  } catch(err){
    res.status(400).json({error:err.massage})
  }
})

adminRoute.get('/admin_DTH_recharge',async(req,res)=>{
    
  try{
    const DTH = await DTHRechargeModel.find().sort({ _id: -1 })
    res.status(200).json({msg:'All DTH Recharge Data',DTH})
  } catch(err){
    res.status(400).json({error:err.massage})
  }
})


module.exports = { adminRoute }