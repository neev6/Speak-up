import nc from "next-connect";
import FeedbackSchema from "../models/complainSchema";

const handler = nc();

handler.delete(async (req, res) => {
    const iddata = req.query.id
    try {
    const deletecomplain = await FeedbackSchema.deleteOne({ _id: iddata })
    if(deletecomplain){
        res.status(201).json({success: true, msg:"Dleted Successfully"})
    }
    else{
        res.status(401).json({success: false, msg:"Not Dleted "})
    }
    } catch (error) {
        res.status(401).json({success: false, msg:"Not Dleted "})
        console.log(error)
    }
})

export default handler;