const mongoose=require("mongoose")

const adminUserSchema=mongoose.Schema({
    adminName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const AdminUserModel=mongoose.model("adminUser",adminUserSchema)
module.exports={
    AdminUserModel
}