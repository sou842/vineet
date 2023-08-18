const mongoose=require('mongoose')

const panDocsSchema=mongoose.Schema({
    aadharDoc:{type:String},
    parentAadharDoc:{type:String},
    form49Front:{type:String},
    form49Back:{type:String},
    panid:{type:String},
    receiptPdf:{type:String},
    vendorID:{type:String},
})
const panDocsModel=mongoose.model("panDoc",panDocsSchema)
module.exports={
    panDocsModel
}