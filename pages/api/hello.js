import nc from "next-connect";
import FeedbackSchema from "./models/complainSchema";

const handler = nc();

handler.post(async (req, res) => {
  try {
    const { name, email, dpt, dpt2, date, cmpln } = req.body;
    if (!name || !email || !dpt || !dpt2 || !date || !cmpln) {
      res.status(404).json({ message: "Please fill all the inputs" });
      return;
    }
    const complainExist = await FeedbackSchema.findOne({ cmpln });
      if (complainExist) {
        res
          .status(402)
          .json({ success: "already", message: "complain already exists" });
        return;
      }
 
    const data = await FeedbackSchema({
      name,
      email,
      dpt,
      dpt2,
      date,
      cmpln,
    });

    const result = await data.save();
    if (result) {
      res.status(200).json({ success: true, message: "Success" });
    } else {
      res.status(404).json({ success: false, message: "error" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "error" });
    console.log(error);
  }
});

export default handler;
