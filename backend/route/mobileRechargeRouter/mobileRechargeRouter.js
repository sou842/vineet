const express = require('express');
const { auth } = require('../../middleware/auth.middleware');
const { mobileRechargeModel } = require('../../model/mobileRechargeModel/mobileRechargeModel');
const { UserModel } = require('../../model/user.model');
const date = require("date-and-time");
const { AllPaymentDetailsModel } = require('../../model/allPaymentDetails.model');

const mobileRechargeRouter = express.Router()


mobileRechargeRouter.get('/recharge_data', auth, async (req, res) => {

    try {
        const mobileRecharge = await mobileRechargeModel.find({ userID: req.body.userID })
        res.status(200).json({ msg: 'all recharged data', mobileRecharge })
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

mobileRechargeRouter.post('/new_Recharge', auth, async (req, res) => {
    const {amount,userID,vendorID}=req.body

    try {

        const user=await UserModel.findOne({_id:userID})
        if(user.balance<Number(amount)){
            res.send("Wallet balance is low please add balance!")
        }
        else{
            const now = new Date();
            const dateAndTime= date.format(now, "YYYY/MM/DD HH:mm:ss")
            const tran=new AllPaymentDetailsModel({vendorID,userID,reason:"Mobile Recharge",debit:amount,dateAndTime})
            await tran.save()
            // console.log(tran);
            await UserModel.findByIdAndUpdate({ _id: userID },{balance:Number(user.balance)-Number(amount)});
            const mobileRecharge = new mobileRechargeModel(req.body)
        await mobileRecharge.save()
        res.status(200).json({ msg: 'Recharge completed', mobileRecharge })
        }
        
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { mobileRechargeRouter }