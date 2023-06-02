import nc from "next-connect";
import StudentSchema from "./models/studentSchema";
const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");
const handler = nc();

handler.post(async (req, res) => {
 
    const { name, password, email, cpassword } = req.body;
    if (!name || !password || !email || !cpassword) {
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
        res
          .status(402)
          .json({ success: false, message: "Student already exists" });
        return;
      }

      const student = await StudentSchema.create({ name, password:encryptedPassword, email });
      const result = await student.save();

      if (result) {
        res
        const token = jwt.sign({student},process.env.JWT_SECRET,{
          expiresIn:'2d'
        });
        res.status(222).json({success: true, token});
} else {
        res
          .status(400)
          .json({ success: false, message: "Student can't be crated" });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false, message: "Error Occured" });
    }
  }
)
export default handler;

