const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{type: String, required: true},
    email:{type: String, required: true},
    mobileNumber:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
    pincode:{type: String, required: true},
    state:{type: String, required: true},
    shopeName:{type: String, required: true},
    panNumber:{type: String, required: true},
    aadharNumber:{type: String, required: true},
    password:{type: String, required: true},
    vendorID:{type: String, required: true},
    joindate:{type: String, required: true},

})
const UserModel = mongoose.model("user", userSchema);

module.exports={
    UserModel
}