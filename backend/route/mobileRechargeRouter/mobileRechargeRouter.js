const express = require('express');
const { auth } = require('../../middleware/auth.middleware');
const { mobileRechargeModel } = require('../../model/mobileRechargeModel/mobileRechargeModel');

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

    try {
        const mobileRecharge = new mobileRechargeModel(req.body)
        await mobileRecharge.save()
        res.status(200).json({ msg: 'Recharge completed', mobileRecharge })
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { mobileRechargeRouter }