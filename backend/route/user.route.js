const express=require("express")
const generator = require('generate-password');
const prandom = require('prandom');
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const userRoute=express.Router()




// register
userRoute.post("/register",async(req,res)=>{
    try {
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        const randomNumber = prandom.number(7)
        bcrypt.hash(password, 5, function(err, hash) {
            req.body.password=hash
            req.body.vendorID="VDP"+randomNumber
            const user= new UserModel(req.body)
            user.save();
            res.send({"password":password,"venorid":"VDP"+randomNumber,"msg":"Registration successfull"})

           
        });
       
      
    } catch (error) {
        res.send(error)
    }
})


//login
userRoute.post("/login",async(req,res)=>{
    const {vendorID,password}=req.body
  
        const user= await UserModel.findOne({vendorID})
        if(user){
            try {
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({vendorID:user.vendorID}, 'vdp');
                        res.send({"msg":"login successful","token":token})
                    }
                    else{
                        res.send({"msg":"Invalid Credentials"})
                    }
                });
                
            } catch (error) {
                res.send(error)
            }
           
        }
        else{
            res.send({"msg":"User not found!"})
        }
   
})





module.exports={
    userRoute
}