
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const uri = process.env.DB_URI;


async function connectDB() {
  try {
    await mongoose.connect(uri!);
    console.log('connect DB success')
  } catch(error) {
    console.log(error);
    throw Error('db connect failed')
  }
}

export default connectDB;
