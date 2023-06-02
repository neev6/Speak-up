import mongoose from "mongoose";

const user = mongoose.createConnection(process.env.MONGO_URI)

export default user;