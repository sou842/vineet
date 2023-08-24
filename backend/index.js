const express=require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { connection } = require("./db");
const { userRoute } = require('./route/user.route');
const { newPanRoute } = require("./route/newPan.route");
const { paymentRoute } = require("./route/payment.route");
const { profileRouter } = require("./route/profilePicture.route");
const { panDocsRoute } = require("./route/panDocs.route");
const { adminRoute } = require("./route/admin/admin.route");
const { updatePanRoute } = require("./route/updatePan.route");
const { mobileRechargeRouter } = require("./route/mobileRechargeRouter/mobileRechargeRouter");
const { DTHRechargeRouter } = require("./route/DTHRechargeRouter/DTHRechargeRouter");


require('dotenv').config();
const app=express()
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json())
app.use(cors())
app.use('/payment',paymentRoute)
app.use('/profile',profileRouter)
app.use('/user',panDocsRoute)
app.use('/api',userRoute)
app.use('/user',newPanRoute)
app.use('/admin',adminRoute)
app.use('/user',updatePanRoute)
app.use('/mobileRecharge',mobileRechargeRouter)
app.use('/DTHRecharge',DTHRechargeRouter)


app.use(express.static('documents'))


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log('conected to mongoDB'); 
    } catch (error) {
        console.log(error);
    }
    console.log(`http://localhost:${process.env.PORT}`);
})