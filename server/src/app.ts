import express from 'express';
import passport from 'passport';
import { connectDB } from './utils/db';
import * as dotenv from 'dotenv';
// import './config/passport';

const app = express();

// Connect to the database
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

export default app;
