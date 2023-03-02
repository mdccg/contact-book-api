import dotenv from 'dotenv';
import { connect } from 'mongoose';

dotenv.config();

export const connectToMongoDB = async () => {
  await connect(process.env.DB_URL as string);
  console.log('App connected to MongoDB');
}