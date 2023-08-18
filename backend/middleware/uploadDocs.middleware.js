const express=require('express')
const multer  = require('multer')

    
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'documents/')
    },
    filename:(req,file,cb)=>{
        
        cb(null,file.fieldname+"_"+Date.now()+file.originalname)
    }
})
const upload=multer({
    storage:storage
})



module.exports={
    upload
}