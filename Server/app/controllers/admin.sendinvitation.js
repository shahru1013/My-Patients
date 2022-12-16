const dotenv = require('dotenv');
const { response } = require('express');
const nodemailer = require('nodemailer');
dotenv.config();
const sendDoctorInvitationMail = (userAuth,email,userName) =>{
    console.log('hahahah in');
    let hostMail = process.env.USER_EMAIL,hostPassword=process.env.USER_PASSWORD;
    let TransPort = nodemailer.createTransport({
        service:"GMAIL",
        auth:{
            user:hostMail,
            pass:hostPassword
        }
    });
    let sender = "DoctorsHut";
    let mailOption = {
        from:sender,
        to:email,
        subject:"Please Confirm Your Email",
        html:`<h4><b>Hi ${userName}, </b><br> 	
        We are glad to invite you to join us as a doctor of DoctorsHut web service. Click on the link below to accept the invitation and get started now. \n <a href="https://khatma.herokuapp.com/verify?auth=${userAuth}"> confirmation link </a>.
        <br>Thank You <br>Khatma Team</h4>`
    };
    TransPort.sendMail(mailOption,(error,response)=>{
        if(error){
           console.log({error});
        }
        else{
           console.log({response});
        }
    });
}
module.exports = sendDoctorInvitationMail;