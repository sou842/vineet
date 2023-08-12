const express = require("express")
const { AdminUserModel } = require("../../model/admin/adminuser.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NewPanModel } = require("../../model/newPan.model");
const { adminAuth } = require("../../middleware/adminAuth.middleware");
const { UserModel } = require("../../model/user.model");
const { panDocsModel } = require("../../model/panDocs.model");
const adminRoute = express.Router()



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
  try {
    const user = await UserModel.find();
    res.send(user)
  } catch (error) {
    res.send(error.messege)
  }
})
//find all pan
//adminRoute.use(adminAuth)
adminRoute.get("/all-pan", async (req, res) => {
  try {
    const pans = await NewPanModel.find();
    res.send(pans)
  } catch (error) {
    res.send(error.messege)
  }
})


adminRoute.get("/category-pan", async (req, res) => {
  const { category } = req.query
  try {
    if (category) {

      const pans = await NewPanModel.find({ category });
      res.send(pans)
    }
    else {
      const pans = await NewPanModel.find();
      res.send(pans)
    }
  } catch (error) {
    res.send(error.messege)
  }
})
adminRoute.get("/individual-pan/:id", async (req, res) => {
  const { id } = req.params

  try {
    const pans = await NewPanModel.findOne({ _id: id })
    res.send(pans)
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
    const top3_latest_user = await UserModel.find().limit(3)
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
adminRoute.patch("/user/status-change/:id",async(req,res)=>{
  const {slipGenerateDate,acknowledgement,receiptPdf}=req.body
  const {id}=req.params
  try {
    await NewPanModel.findByIdAndUpdate({_id:id},{slipGenerateDate,acknowledgement})
    await panDocsModel.findOneAndUpdate({userid:id},{receiptPdf})
    res.send("Update Succesfull")
    
  } catch (error) {
    res.send(error)
  }
})



module.exports = { adminRoute }