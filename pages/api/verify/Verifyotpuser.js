// importing the nc from the next-connect package
import nc from "next-connect";

//importing the otp function from the otp schema
import Otp from "../models/otpSchema";

// initializing the nc to the function
const changeIdPassword = nc();

// defing the method of request
changeIdPassword.post(async (req, res) => {
  let data = await Otp.findOne({ email: req.body.email, code: req.body.otpCode}); //finding that otp that user enters is available in db or not
  if(!data) {
    console.log(data)
    res.status(404).json({ success: false, msg: "Otp is not available"});
    return false;
  }
  res.status(201).json({ success: true, msg:"Found Otp"})
  const deleteotp = await Otp.deleteOne({
    code: req.body.otpCode
  })
  if(deleteotp){
    console.log("Otp deleted successfully")
  }
  else{
    console.log("Otp not deleted ")
  }
});


//exporting the changeIdPasssword  Function to the whole GuruCool enviroment
module.exports = changeIdPassword;