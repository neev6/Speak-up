import mongoose from "mongoose";

const feedback = mongoose.createConnection(process.env.DB_COMPLAIN)

export default feedback;