import nc from "next-connect";
import Hodee from "../models/hodeeSchema";

const CryptoJS = require("crypto-js");
const handler = nc();

handler.get((req, res)=>{
    res.status(404).json({message:"Wrong Request"})
})


handler.post((req, res)=>{
    res.status(404).json({message:"Wrong Request"})
})

handler.delete((req, res)=>{
    res.status(404).json({message:"Wrong Request"})
})

handler.put(async(req, res) => {
    try {
        const { password, email } = req.body;
        if(!password || !email) {
            res.status(400).json({ Error: "Please fill in the email" });
        }
        const hodee = await Hodee.findOne({_id: "644e3db4a6b3079570e4fe4c"});
        const encryptedPassword = CryptoJS.AES.encrypt(
            JSON.stringify(password),
            process.env.CRYPTO_SECRET 
          ).toString();
        
       
        hodee.password = encryptedPassword; 
        const done = await hodee.save(); 
        if(done){
            res.status(201).json({success:true, message: "Successfully updated !!"});
        }
        else{
            res.status(404).json({success:false, message: "Error updating !!"});
        }
    } catch (error) {
       console.log(error);  
    }
} );

module.exports = handler;