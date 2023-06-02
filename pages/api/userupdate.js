import nc from "next-connect";
import StudentSchema from "./models/studentSchema";
import { enGB } from "date-fns/locale";


const CryptoJS = require("crypto-js");
const handler = nc();

handler.post(async (req, res) => {

    const {email, password} = req.body;
    if (!email || !password ) {
      res
        .status(403)
        .json({ success: false, message: "Plz enter the all fields" });
      return;
    }

    try {
        const studentExist = await StudentSchema.findOne({ email });
        const encryptedPassword = CryptoJS.AES.encrypt(
          JSON.stringify(password),
          process.env.CRYPTO_SECRET 
        ).toString();

        if (studentExist) {
           studentExist.password = encryptedPassword;
           const done = await studentExist.save();
            if(done) {
                res
                .status(200)
                .json({ success: true, message: "Password Changed successfully " });
            }
            else {
                res
                  .status(400)
                  .json({ success: false, message: "Password Can't Changed " });
              }
          }
    }
    catch(err){
        console.log(err);
    }


})

export default handler;