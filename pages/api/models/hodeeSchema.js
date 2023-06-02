import mongoose  from "mongoose";
import hodee from "../../../middleware/hodeecon"


const hodeeschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
     password:{
        type:String,
        required:true,
     },
},
{timestamps:true}
)


mongoose.models = {}

export default hodee.model('HodEe',hodeeschema)