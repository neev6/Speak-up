import nc from "next-connect"
import Hodee from "../models/hodeeSchema";
const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");
const handler = nc();

handler.post(async(req, res)=>{
    const{email, password} = req.body
    try {
        const hodee = await Hodee.findOne({email});
        const bytes = CryptoJS.AES.decrypt(
            hodee.password,
            process.env.CRYPTO_SECRET 
        );
        const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (hodee && password === decryptedPassword) {
            const token = jwt.sign({hodee},process.env.JWT_SECRET,{
                expiresIn:'2d'
              });
              res.status(222).json({success: true, token});

        }
        else{
            res.status(400).json({success:"Already",msg:"User Not Found"});
        }
    } catch (error) {
        res.status(400).json({success:false,msg:"User Not Found"});
        console.log(error);
    }

   
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

export default handler;