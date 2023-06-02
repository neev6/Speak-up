const mongoose = require('mongoose');
import feedback from "../../../middleware/complain"


const complainschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
     dpt:{
        type:String,
        required:true,
     },
     dpt2:{
        type:String,
        required:true,
     },
     date:{
        type:Date,
        required:true,
     },
     cmpln:{
        type:String,
        required:true,
     },
})

  

const FeedbackSchema = feedback.models.FEEDBACK || feedback.model("FEEDBACK", complainschema);

module.exports = FeedbackSchema;