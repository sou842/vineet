const mongoose = require("mongoose");

const allPaymentDetailsSchema=mongoose.Schema({
    vendorID:{type:String},
    userID:{type:String},
    dateAndTime:{type:String},
    debit:{type:String},
    credit:{type:String}, 
    razorpay_order_id:{type:String},
    razorpay_payment_id:{type:String},
    razorpay_signature:{type:String},
    reason:{type:String}

})

const AllPaymentDetailsModel=mongoose.model("allPayment",allPaymentDetailsSchema)

module.exports={
    AllPaymentDetailsModel
}
