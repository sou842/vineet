const express = require("express");
const generator = require("generate-password");
const nodemailer = require("nodemailer");
const date = require("date-and-time");
const prandom = require("prandom");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const Mailgen = require("mailgen");
const { auth } = require("../middleware/auth.middleware");
const userRoute = express.Router();

const now = new Date();

// register
userRoute.post("/register", async (req, res) => {
  try {
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    // while(true){
    const randomNumber = prandom.number(7);
    //   const existUser= await UserModel.findOne({vendorID:randomNumber})
    //   if(existUser.vendorID==randomNumber){
    //     continue
    //   }
    //   else{
    //     break
    //   }
    // }


    bcrypt.hash(password, 5, async (err, hash) => {
      req.body.password = hash;
      req.body.vendorID = "VDP"+randomNumber
      req.body.joindate = date.format(now, "YYYY/MM/DD HH:mm:ss");
      const user = new UserModel(req.body);
      user.save();

      // let transporter = await nodemailer.createTransport({
      //     host: "smtp.ethereal.email",
      //     port: 587,
      //     auth: {
      //       // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      //       user: 'arjun.conroy83@ethereal.email',
      //       pass: 'apD2U4xsaxyF9JtneE'//rsbsdfvigqewmhgt
      //     }
      //   });
      //   const info = await transporter.sendMail({
      //     from: '"Fred Foo" <foo@example.com>', // sender address
      //     to: "bar@example.com, baz@example.com", // list of receivers
      //     subject: "Hello ✔", // Subject line
      //     text: "Hello world?", // plain text body
      //     html: "<b>Hello world?</b>", // html body
      //   });
      //   console.log("Message sent: %s", info.messageId);

      //send email real account

      let config = {
        service: "gmail",
        auth: {
          user: "animeshghoroi2000@gmail.com",
          pass: "ktnjaukrkuouhrwh",
        },
      };
      let transporter = nodemailer.createTransport(config);

      let message = {
        from: "animeshghoroi2000@gmail.com",
        to: req.body.email,
        subject: "Your Vineet India Portal Account VenderID",
        html: `<b>Dear, <span style="text-transform: uppercase;">${
          req.body.name
        }</span></b>
    <pre>Vendor ID: ${"VDP"+randomNumber}</pre>
    <pre>Password: ${password}</pre>
    <p>You are informed by Digital India Portal that your ID and Password have been given above so that you can login by visiting the given website of Digital India Portal and access Pan Card, Electricity Bill, Mobile Recharge, DTH Recharge, Digital Signature, Pay, Shopping Portal, Job Portal, Voter ID Card, Passport etc. can take advantage of the service. It is a great pleasure to inform you that the service of Digital India Portal is India's number one service.</p>
    <pre style="text-align: center;border:1px solid; border-radius: 10px;padding: 10px; background-color: #90CAF9;">
      Vineet India Portal
  Pooja Market, Near Petrol Pump, Daurala,
  Meerut, Uttar Pradesh - 250221
  Website : https://www.digitalindiaportal.co.in
  Helpline : +91 9368372889, 9368398663, 9368546898, 7668034958, 7668039141, 7017784029
  Email : helpdigitalindiaportal@gmail.com
    </pre>`,
      };

      transporter
        .sendMail(message)
        .then((re) => {
          res.send({
            vendorID: "VDP" + randomNumber,
            msg: "Registration successfull",
          });
        })
        .catch((err) => {
          res.send(err);
        });
    });
  } catch (error) {
    res.send(error);
  }
});

//login
userRoute.post("/login", async (req, res) => {
  const { vendorID, password } = req.body;

  const user = await UserModel.findOne({ vendorID });
  if (user) {
    try {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { vendorID: user.vendorID, userID: user._id, username: user.name },
            "vdp"
          );
          res.send({
            msg: "login successful",
            token: token,
            username: user.name,
          });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send({ msg: "User not found!" });
  }
});

// user profile

// 1. get all user details
userRoute.use(auth);
userRoute.get("/profile-detail", async (req, res) => {
  const { vendorID, userID, username } = req.body;
  try {
    const user = await UserModel.find({vendorID });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

 
// 2. update single user details
userRoute.use(auth);
userRoute.patch("/profile-update", async (req, res) => {
  const { vendorID, userID, username } = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: userID }, req.body);
    res.send("Successfully updated");
  } catch (error) {
    res.send(error);
  }
});

// 3. update  user password
userRoute.use(auth);
userRoute.patch("/user/change-password", async (req, res) => {
  const { userID, newPassword, oldPassword } = req.body;
  const user = await UserModel.findOne({ _id: userID });
  if (user) {
    try {
      bcrypt.compare(oldPassword, user.password, function (err, result) {
        if (result) {
          bcrypt.hash(newPassword, 5, async (err, hash) => {
            await UserModel.findByIdAndUpdate(
              { _id: userID },
              { password: hash }
            );

            //change password email send
            let config = {
              service: "gmail",
              auth: {
                user: "animeshghoroi2000@gmail.com",
                pass: "ktnjaukrkuouhrwh",
              },
            };
            let transporter = nodemailer.createTransport(config);

            let message = {
              from: "animeshghoroi2000@gmail.com",
              to: user.email,
              subject: "Your update password in Vineet India Portal Account",
              html: `<b>Dear, <span style="text-transform: uppercase;">${user.name}</span></b>
    <pre>Vendor ID: ${user.vendorID}</pre>
    <pre>Password: ${newPassword}</pre>
    <p>You are informed by Digital India Portal that your ID and Password have been given above so that you can login by visiting the given website of Digital India Portal and access Pan Card, Electricity Bill, Mobile Recharge, DTH Recharge, Digital Signature, Pay, Shopping Portal, Job Portal, Voter ID Card, Passport etc. can take advantage of the service. It is a great pleasure to inform you that the service of Digital India Portal is India's number one service.</p>
    <pre style="text-align: center;border:1px solid; border-radius: 10px;padding: 10px; background-color: #90CAF9;">
      Vineet India Portal
  Pooja Market, Near Petrol Pump, Daurala,
  Meerut, Uttar Pradesh - 250221
  Website : https://www.digitalindiaportal.co.in
  Helpline : +91 9368372889, 9368398663, 9368546898, 7668034958, 7668039141, 7017784029
  Email : helpdigitalindiaportal@gmail.com
    </pre>`,
            };

            transporter
              .sendMail(message)
              .then((re) => {
                res.send("Your password has been upadated");
              })
              .catch((err) => {
                res.send(err);
              });
          });
        } else {
          res.send("Old password are not match!");
        }
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("User Not found");
  }
});

//balance update and save all payment id
userRoute.use(auth);
userRoute.patch("/add-balance",async(req,res)=>{
  const { userID,amount,razorpay_payment_id,razorpay_signature,razorpay_order_id,date } = req.body;
  try {
    const user=await UserModel.findOne({_id:userID})
    await UserModel.findByIdAndUpdate({ _id: userID },{balance:Number(user.balance)+Number(amount)});
     await UserModel.updateMany({_id:userID},{$push:{allOrders:{razorpay_signature,razorpay_payment_id,razorpay_order_id,date }}})
res.send(`${amount} add successfull`)

    
  } catch (error) {
    res.send(error)
  }
})
//get singel user
userRoute.use(auth);
userRoute.get("/",async(req,res)=>{
  try {
    const user= await UserModel.findOne({vendorID:req.body.vendorID})
    res.send(user)
    
  } catch (error) {
    res.send(error)
  }
})

userRoute.use(auth);
userRoute.get("/allUserData",async(req,res)=>{
  try {
    const user= await UserModel.find();
    res.send(user)
    
  } catch (error) {
    res.send(error)
  }
})



module.exports = {
  userRoute,
};
