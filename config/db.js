import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Connection with mongoDb is Successfull 🤑");
  } catch (error) {
    console.error(`Error in MongoDB ${error}`);
  }
};

export default connectDB;
