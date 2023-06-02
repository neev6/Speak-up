import mongoose from "mongoose";

const otp = mongoose.createConnection(process.env.MONGO_URI)

export default otp;