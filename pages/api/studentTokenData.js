import nc from "next-connect";
const jwt = require("jsonwebtoken");
const StudentSchema = require("./models/studentSchema");
require("../../middleware/conn");

const handler = nc();

handler.post(async (req, res) => {
  const { token } = req.body;

  try {
    const student = await jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return "token Expired";
      }
      return data;
    });
    if (student === "token Expired") {
      return res.status(201).json({ status: false, data: "Token Expired !!" });
    }else{
        console.log(student.student.email)
      const studentData = await StudentSchema.findOne({ email: student.student.email})
      res.status(201).json({ status: true,  studentData}) 
    }
  } catch (error) {
    console.log(error);
  }
});

// Handling the get request
handler.get((req, res) => {
  res.status(404).json({ msg: "Wrong Request !!" });
});

//Handling the put request
handler.put((req, res) => {
  res.status(404).json({ msg: "Wrong Request !!" });
});

//Handling the delete request
handler.delete((req, res) => {
  res.status(404).json({ msg: "Wrong Request !!" });
});

export default handler;