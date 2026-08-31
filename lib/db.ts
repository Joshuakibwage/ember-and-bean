import mongoose from "mongoose";


const connectDB = async() => {

    try {

        await mongoose.connect(process.env.MONGO_URI!);

        console.log(`Successfully connected to Mongo DB`)
        
    } catch (error) {

        console.error("MongoDB connection error:", error instanceof Error ? error.message : error);

        throw error;
        
    }

}

export default connectDB;