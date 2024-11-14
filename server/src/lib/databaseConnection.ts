import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();
export const ConnectToMongoDB = async () => {
    try {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
        await connect(url);

        console.log("Successfully connected to the Database")
    } catch (error) {
        console.log("Failed to connect to the Database. ", error);
    }
}