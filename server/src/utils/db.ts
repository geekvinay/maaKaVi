import mongoose from 'mongoose';
import logger from './logger/logger';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maaKavi';
    console.log('mongoURI: ', mongoURI);
    await mongoose.connect(mongoURI, {});
    logger.info('MongoDB connected');
  } catch (err: any) {
    logger.info(err.message);
    process.exit(1);
  }
};
