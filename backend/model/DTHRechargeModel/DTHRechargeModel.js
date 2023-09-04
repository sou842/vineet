const mongoose = require("mongoose");

const DTHRechargeSchema = mongoose.Schema({
    operator: { type: String },
    state: { type: String },
    phone: { type: String },
    amount: { type: String },
    userID: { type: String },
    username: { type: String },
    vendorID: { type: String },
    date: { type: String },
    time: { type: String },
    status: {type:Boolean}

})

const DTHRechargeModel = mongoose.model("DTHRecharge", DTHRechargeSchema)

module.exports = { DTHRechargeModel }