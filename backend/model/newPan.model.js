const mongoose=require('mongoose')

const documenstSchema=mongoose.Schema({
    name:{type:String},
    image:{type:String}
})

const newPanSchema=mongoose.Schema({
    category:{type: String, required: true},
    date: {type: String, required: true},
    city: {type: String, required: true},
    areaCode: {type: String},
    aotype: {type: String},
    rangeCode: {type: String},
    aoNo: {type: String},
    firstName: {type: String, required: true},
    middleName: {type: String},
    lastName: {type: String, required: true},
    title:{type: String, required: true},
    gender: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    monthOfBirth: {type: String, required: true},
    yearOfBirth: {type: String, required: true},
    residenceAddress: {type: String},
    flatNumber: {type: String, required: true},
    premisesName: {type: String},
    roadName: {type: String, required: true},
    area: {type: String, required: true},
    cityDistrict: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true},
    telephoneISDCode: {type: String, required: true},
    telephoneNumber: {type: String, required: true},
    email: {type: String, required: true},
    aadhaarNumber: {type: String, required: true},
    aadhaarName: {type: String, required: true},
    sourceOfIncome: {type: String, required: true},
    identityProof: {type: String},
    addressProof: {type: String},
    dobProof: {type: String},
    declarationCapacity: {type: String, required: true},
    verifierName: {type: String, required: true},
    verifierPlace: {type: String, required: true},
    verificationDate: {type: String, required: true},
    requiredOption: {type: String},
    userID: {type: String, required: true},
    vendorID: {type: String, required: true},
    tokenNumber: {type: String, required: true},
    documents: [documenstSchema],
    PanFee: {type: Number, required: true}
})

const NewPanModel = mongoose.model("newPancard", newPanSchema);

module.exports={
    NewPanModel
}
