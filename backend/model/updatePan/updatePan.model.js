const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    category: String,
    date: Date,
    firstName: String,
    middleName: String,
    lastName: String,
    title: String,
    gender: String,
    dateOfBirth: String,
    monthOfBirth: String,
    yearOfBirth: String,
    Address: String,
    flatNumber: String,
    premisesName: String,
    roadName: String,
    area: String,
    cityDistrict: String,
    state: String,
    zipCode: String,
    country: String,
    telephoneISDCode: String,
    telephoneNumber: String,
    email: String,
    aadhaarNumber: String,
    aadhaarName: String,
    identityProof: String,
    addressProof: String,
    dobProof: String,
    declarationCapacity: String,
    verifierName: String,
    verifierPlace: String,
    verificationDate: Date,
    requiredOption: String,
    isDoneFromUser: Boolean,
    PanFee: Number,
    father_FName: String,
    father_MName: String,
    father_LName: String,
    NameOnCard: String,
    isUpload: Boolean,
    ageOfTheUser: String,
    slipGenerateDate: String,
    acknowledgement: String,
    panStatus: String,
    numberofdocuments: String,
    pancardProof: String,
    panNumber: String,
    correction_section_1: String,
    correction_section_2: String,
    correction_section_3: String,
    correction_section_4: String,
    correction_section_5: String,
    madeFor: String,
    vendorID: String,
    userID: String,
});

const UpdatePanModel = mongoose.model('updatePan', userSchema);

module.exports ={
    UpdatePanModel
};
