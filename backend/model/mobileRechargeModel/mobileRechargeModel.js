const mongoose = require("mongoose");

const mobileRechargeSchema = mongoose.Schema({
    operator: { type: String },
    state: { type: String },
    phone: { type: String },
    amount: { type: String },
    userID: { type: String },
    username: { type: String },
    vendorID: { type: String },
    date: { type: String },
    time: { type: String },

})

const mobileRechargeModel = mongoose.model("mobileRecharge", mobileRechargeSchema)

module.exports = { mobileRechargeModel }