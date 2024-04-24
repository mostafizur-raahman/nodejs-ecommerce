import mongoose from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Datbase connected ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Databae connection error : ${error}`.bgRed.white);
    }
};

export default connectDatabase;
