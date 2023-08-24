const mongoose=require("mongoose")


const feedbackSchema=mongoose.Schema({
    name:{type: String, },
    email:{type: String, },
    mobileNumber:{type: String, },
    message:{type: String, }
   
 

})
const FeedbackModel = mongoose.model("feedback", feedbackSchema);

module.exports={
    FeedbackModel
}