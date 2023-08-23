const express = require("express")
const Razorpay = require('razorpay');
const date = require("date-and-time");
const crypto = require("crypto");
const { auth } = require("../middleware/auth.middleware");
const { AllPaymentDetailsModel } = require("../model/allPaymentDetails.model");
const { UserModel } = require("../model/user.model");
const paymentRoute = express.Router()
const KEY_ID = "rzp_test_4PEjkS1Agy6kpO";
const KEY_SECRET = "IxtVLhJDIu4sHy5EQgaf2iKL"

paymentRoute.post('/order', (req, res) => {

    let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

    let options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        if (err) {
            res.status(500).send({ "msg": "server Error" })
        }
        else {
            res.send(order)
        }
    });
})



paymentRoute.post('/verify', (req, res) => {
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }


})

paymentRoute.use(auth)
paymentRoute.post('/user/credit-oredr-details', async (req, res) => {
    const { vendorID, userID, amount, razorpay_payment_id, razorpay_signature, razorpay_order_id } = req.body
    const now = new Date();
    req.body.dateAndTime = date.format(now, "YYYY/MM/DD HH:mm:ss")
    try {
        const user = await UserModel.findOne({ _id: userID })
        const tran = new AllPaymentDetailsModel({ vendorID, userID, razorpay_order_id, razorpay_payment_id, razorpay_signature, credit: amount, dateAndTime: req.body.dateAndTime })
        await tran.save()
        await UserModel.findByIdAndUpdate({ _id: userID }, { balance: Number(user.balance) + Number(amount) });
        res.send(`${amount} add successfull`)

    } catch (error) {
        res.send(error)
    }
})


// singel user transaction details
paymentRoute.use(auth)
paymentRoute.get("/user/all-transaction", async (req, res) => {
    const { userID } = req.body
    try {
        const allTrans = await AllPaymentDetailsModel.find({ userID })
        res.send(allTrans)

    } catch (error) {
        res.send(error)
    }
})





module.exports = {
    paymentRoute
}