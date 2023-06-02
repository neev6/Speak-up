import mongoose  from "mongoose";
import hod from "../../../middleware/hodconn"


const hodschema = new mongoose.Schema({
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

export default hod.model('Hod',hodschema)