const express=require("express")
const generator = require('generate-password');
const nodemailer = require("nodemailer");
const prandom = require('prandom');
const jwt = require('jsonwebtoken');
const {UserModel}=require("../model/user.model")
const bcrypt = require('bcrypt');
const Mailgen = require("mailgen");
const userRoute=express.Router()




// register
userRoute.post("/register",async(req,res)=>{
    try {
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        const randomNumber = prandom.number(7)
        bcrypt.hash(password, 5, async(err, hash) =>{
            req.body.password=hash
            req.body.vendorID="VDP"+randomNumber
            const user= new UserModel(req.body)
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
    service : 'gmail',
    auth : {
        user: "animeshghoroi2000@gmail.com",
        pass: "ktnjaukrkuouhrwh"
    }
}
let transporter = nodemailer.createTransport(config);

// let MailGenerator = new Mailgen({
//     theme: "default",
//     product : {
//         name: "Vineet India Portal",
//         link : 'https://mailgen.js/'
//     }
// })

// let response = {
//     body: {
//         greeting:"Dear",
//         name : req.body.name,
//         intro: "Your vendorID and Password here",
//         action: {
//             intro: `vendorID: ${"VDP"+randomNumber}`,
//             instructions: `Password: ${password}`,
//             button: {
//                 color: 'green',
//                 text: 'Confirm Your Account',
//                 link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
//             },
        
//         },
//         outro: "Please note: Don't share anyone your password"
//     }
// }

// let mail = MailGenerator.generate(response)

let message = {
    from : "animeshghoroi2000@gmail.com",
    to : req.body.email,
    subject: "Your Vineet India Portal Account VenderID",
    html:`<b>Dear, <span style="text-transform: uppercase;">${req.body.name}</span></b>
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
    </pre>`
}

             
           
transporter.sendMail(message).then((re)=>{
        res.send({"password":password,"venorid":"VDP"+randomNumber,"msg":"Registration successfull"})
        
    })
    .catch((err)=>{
        res.send(err)
    })
           
        });
       
      
    } catch (error) {
        res.send(error)
    }
})


//login
userRoute.post("/login",async(req,res)=>{
    const {vendorID,password}=req.body
  
        const user= await UserModel.findOne({vendorID})
        if(user){
            try {
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({vendorID:user.vendorID}, 'vdp');
                        res.send({"msg":"login successful","token":token})
                    }
                    else{
                        res.send({"msg":"Invalid Credentials"})
                    }
                });
                
            } catch (error) {
                res.send(error)
            }
           
        }
        else{
            res.send({"msg":"User not found!"})
        }
   
})





module.exports={
    userRoute
}