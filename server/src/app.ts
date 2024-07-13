import express from 'express';
import { connectDB } from './utils/db';
import * as dotenv from 'dotenv';
import userRouter from './routes/user/user';
import { formatResponse } from './utils/res-transformer/res-transformer';

const app = express();

// Connect to the database
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(formatResponse);

// Routes
app.get("/", (req, res) => {
    res.json("Hello world");
});
app.use("/v1/users", userRouter);

export default app;
