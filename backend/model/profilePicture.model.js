const mongoose=require("mongoose")

const profilePictureSchema=mongoose.Schema({
    avatar:{type:String},
    userID:{type:String},
    vendorID:{type:String},
    lastUpdate:{type:String}
})

const ProfilePictureModel=mongoose.model("profile_picture",profilePictureSchema)
module.exports={
    ProfilePictureModel
}
