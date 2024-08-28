import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const dbconnection = await mongoose.connect(process.env.MONGODB);
    console.log(
      `\nDatabase connected !! DB HOST: ${dbconnection.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDb;
