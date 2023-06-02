import nc from "next-connect"
import FeedbackSchema from "./models/complainSchema";

const handler = nc();

handler.get(async (req,res)=>{

    const dpt2 = req.query?.dpt2;

    if(dpt2 === "EE"){
            
    const allcomplain = await FeedbackSchema.find({
        dpt2: dpt2
    })
    return res.status(201).json(allcomplain)
    }

    
    if(dpt2 === "CS"){
            
        const allcomplain = await FeedbackSchema.find({
            dpt2: dpt2
        })
        return res.status(201).json(allcomplain)
        }

   
    return res.status(201).json("No Data Found")


})


export default handler;
