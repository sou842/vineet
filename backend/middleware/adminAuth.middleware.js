const express=require("express")
const jwt=require("jsonwebtoken")

const adminAuth=(req,res,next)=>{
const token = req.headers.authorization;
if(token){
    try {
        const decoded = jwt.verify(token, 'adminvdp');
       if(decoded){
            req.body.adminName=decoded.adminName
            req.body.adminID=decoded.adminID
        next()
       }
    } catch (error) {
        res.send(error)
    }
}
else{
    res.send("You are not a admin please get access from manager!")
}

}
module.exports={
    adminAuth
}