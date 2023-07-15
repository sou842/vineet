const express=require("express")
const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
const token = req.headers.authorization;
if(token){
    try {
        const decoded = jwt.verify(token, 'vdp');
       if(decoded){
            req.body.username=decoded.username
            req.body.userID=decoded.userID
            req.body.vendorID=decoded.vendorID
            // console.log(decoded.vendorID);
        next()
       }

        
    } catch (error) {
        res.send(error)
    }
}
else{
    res.send("Please Login!")
}

}
module.exports={
    auth
}