import mongoose from 'mongoose'
import logger from './logger/logger';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/maaKavi', {})
    logger.info('MongoDB connected')
  } catch (err: any) {
    logger.info(err.message)
    process.exit(1)
  }
}
