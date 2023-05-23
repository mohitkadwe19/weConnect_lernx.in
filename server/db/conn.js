import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection string
const dbURI = process.env.MONGO_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected successfully 🟢");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
