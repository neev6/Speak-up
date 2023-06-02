// importing a package called next-connect to handle the api req request from the front end
import nc from "next-connect";

//importing the schema to save the otp and verify
import Otp from "../models/otpSchema";

import OtpSending from "./Otpsending"

//initializing the next-connect as nc to the handler function
const handler = nc();

//if the request is get request then the end point will send the hello
handler.post(async(req,res)=>{
  
  const { email, name }  = req.body;  // destructring the email and name of the user that comes from frontend

  if(email){
    function generateOtp(){
        let otpCode = "";
        for (let i = 0; i < 6; i++){
          otpCode += Math.floor(Math.random()*10);
        }
        if(otpCode === undefined){
          generateOtp();
        }
        return otpCode;
    }

    function generateOtpWithExpiry(){
      const otpCode = generateOtp();
      const expiry = Date.now() + 300000;
      return {otpCode, expiry};
    }

    const { otpCode, expiry } = generateOtpWithExpiry();
    console.log(`otp:${otpCode}`);
    console.log(`Expires at: ${new Date(expiry).toLocaleString()}`);

    
    let optData = new Otp({ // creating new document in mongo db
        email: email, // email of the user
        code: otpCode,  // saving the opt code to mongo db
        expireIn: new Date(expiry), // setting the  expiry time of the otp
    });
    let otpResponse = await optData.save();              // saving the document created above
    if (otpResponse){    
        res.status(201).json({success:true, msg:"OTP GENERATED"});        // if document is generated then sending success
        await OtpSending(email,name, otpCode)
    }else{
        res.status(404).json({success:false,msg: "OTP NOT FOUND"});           // any error ocuurs then it woll show this error
    }
  }

})

//exporting default the function handler 
export default handler;