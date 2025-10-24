import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOURL)

    console.log(`MongoDB connected: ${conn.connection.host}`);
    
  } catch (error) {
    console.log("Mongo DB error", error.message || "");
    process.exit(1)
  }
}