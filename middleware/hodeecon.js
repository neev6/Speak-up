import mongoose from "mongoose";

const hodEe = mongoose.createConnection(process.env.DB_HOD_EE)

export default hodEe;