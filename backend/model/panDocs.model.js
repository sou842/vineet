const mongoose=require('mongoose')

const panDocsSchema=mongoose.Schema({
    aadharDoc:{type:String},
    form49Front:{type:String},
    form49Back:{type:String},
    isUpload:{type:Boolean},
    vendorID:{type:String},
    userid:{type:String}
})
const panDocsModel=mongoose.model("panDoc",panDocsSchema)
module.exports={
    panDocsModel
}