const express = require('express');
const { auth } = require('../../middleware/auth.middleware');
const { DTHRechargeModel } = require('../../model/DTHRechargeModel/DTHRechargeModel');

const DTHRechargeRouter = express.Router()


DTHRechargeRouter.get('/recharge_data', auth, async (req, res) => {

    try {
        const DTHRecharge = await DTHRechargeModel.find({ userID: req.body.userID })
        res.status(200).json({ msg: 'all recharged data', DTHRecharge })
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})

DTHRechargeRouter.post('/new_Recharge', auth, async (req, res) => {

    const {amount,userID,vendorID}=req.body
    try {






        const DTHRecharge = new DTHRechargeModel(req.body)
        await DTHRecharge.save()
        res.status(200).json({ msg: 'Recharge completed', DTHRecharge })
    } catch (err) {
        res.status(400).json({ error: err.massage })
    }
})


module.exports = { DTHRechargeRouter }