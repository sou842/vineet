const express=require("express")
const Razorpay = require('razorpay');
const crypto=require("crypto")
const paymentRoute=express.Router()
const KEY_ID="rzp_test_4PEjkS1Agy6kpO";
const KEY_SECRET="IxtVLhJDIu4sHy5EQgaf2iKL"

paymentRoute.post('/order',(req,res)=>{ 

let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

let options = {
  amount: req.body.amount*100,  // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
    if(err){
        res.status(500).send({"msg":"server Error"})
    }
    else{
        res.send(order)
    }
});
})



paymentRoute.post('/verify',(req,res)=>{
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




module.exports={
    paymentRoute
}