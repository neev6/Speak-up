import nc from "next-connect";
import StudentSchema from "./models/studentSchema";


const CryptoJS = require("crypto-js");
const handler = nc();

handler.delete(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(403)
      .json({ success: false, message: "Plz enter the all fields" });
    return;
  }

  try {
    const student = await StudentSchema.findOne({ email });
    const bytes = CryptoJS.AES.decrypt(
      student.password,
      process.env.CRYPTO_SECRET
    );
    const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    if (student && password === decryptedPassword) {
      const studentExist = await StudentSchema.deleteOne({ email });
      if (studentExist) {
        res.status(200).json({ success: true, message: "User Deleted" });
      } else {
        res.status(500).json({ success: false, message: "User Can't Deleted" });
      }
    } else {
      res.status(400).json({ success: "nomatch", msg: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default handler;
