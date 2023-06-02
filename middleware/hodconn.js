import mongoose from "mongoose";

const hod = mongoose.createConnection(process.env.DB_HOD)

export default hod;