import nc from "next-connect"
const StudentSchema = require("./models/studentSchema");
const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");
const handler = nc();

handler.post(async(req, res)=>{
    const{email, password} = req.body
    try {
        const student = await StudentSchema.findOne({email});
        const bytes = CryptoJS.AES.decrypt(
            student.password,
            process.env.CRYPTO_SECRET 
        );
        const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (student && password === decryptedPassword) {
            const token = jwt.sign({student},process.env.JWT_SECRET,{
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

export default handler;