import mongoose  from "mongoose";
import user from "../../../middleware/conn"


const studentschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
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

  

  const StudentSchema = user.models.USER || user.model("USER", studentschema);

module.exports = StudentSchema;