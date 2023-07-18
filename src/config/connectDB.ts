import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) { throw new Error('MONGO_DB_URI is not defined') };

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log("🚀🚀🚀 ~ Connected to DataBase ~")
  } catch (error) {
    console.log("🚀🚀🚀 ~ Connect Error: ", error)
    process.exit(1);
  }
}

export default connectDB;
