const express=require("express")
const { AdminUserModel } = require("../../model/admin/adminuser.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NewPanModel } = require("../../model/newPan.model");
const { adminAuth } = require("../../middleware/adminAuth.middleware");
const { UserModel } = require("../../model/user.model");
const adminRoute=express.Router()



//admin register
adminRoute.post("/register",async(req,res)=>{
    const {adminName,name,email,password}=req.body
    try {
       
    bcrypt.hash(password, 5, async(err, hash) => {
        if(hash){
            const admin =new AdminUserModel({email,adminName,password:hash})
            await admin.save()
            res.send("Admin user created")
        } 
    })  
    } catch (error) {
        res.send(error)
    }
})

//admin login
adminRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user = await AdminUserModel.findOne({email});
  if (user) {
    try {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { adminName:user.adminName,adminID:user._id },
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
adminRoute.get("/all-login-user",async(req,res)=>{
    try {
        const user=await UserModel.find();
        res.send(user)
    } catch (error) {
        res.send(error.messege)
    }
})
//find all pan
//adminRoute.use(adminAuth)
adminRoute.get("/all-pan",async(req,res)=>{
    try {
        const pans=await NewPanModel.find();
        res.send(pans)
    } catch (error) {
        res.send(error.messege)
    }
})


adminRoute.get("/category-pan",async(req,res)=>{
  const {category}=req.query
  try {
      const pans=await NewPanModel.find({category});
      res.send(pans)
  } catch (error) {
      res.send(error.messege)
  } 
})
adminRoute.get("/individual-pan/:id",async(req,res)=>{
  const {id}=req.params
  try {
      const pans=await NewPanModel.findOne({_id:id});
      res.send(pans)
  } catch (error) {
      res.send(error.messege)
  }
})

  







module.exports={
    adminRoute
}