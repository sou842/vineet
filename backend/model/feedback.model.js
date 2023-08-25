const mongoose=require("mongoose")


const feedbackSchema=mongoose.Schema({
    name:{type: String, },
    email:{type: String, },
    phoneNumber:{type: String, },
    message:{type: String, },
    vendorID:{type: String, },
    userID:{type: String, }
   
 

})
const FeedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports={
    FeedbackModel
}