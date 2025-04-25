import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URI;
        if(!url) {
            logger.warn("Your MongoDb Url not found!!");
            process.exit(1);
        }
        await mongoose.connect(url);
        logger.info('Server Connected to DB');
    } catch(error) {
        logger.error(`MongoDB Connections Failed! ${error}`);
        process.exit(1);
    }
} 

export default connectDB;