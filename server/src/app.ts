import express from "express";
import { connectDB } from "./utils/db";
import * as dotenv from "dotenv";
import userRouter from "./routes/user/user";
import kaviRouter from "./routes/kavi/kavi";
import codeLabRouter from "./routes/code_lab/codelab";
import cohortRouter from "./routes/cohort/cohort";
import commentRouter from "./routes/comment/comment";
import discussionRouter from "./routes/discussion/discussion";
import learningModuleRouter from "./routes/learning_module/learning_module";
import articleRouter from "./routes/article/article";

import { formatResponse } from "./utils/res-transformer/res-transformer";
import { authenticateToken } from './controllers/auth/auth';

import { registerUser, loginUser } from "./controllers/auth/auth";
const cors = require('cors');



// Allow all origins

const app = express();

// Connect to the database
dotenv.config();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(formatResponse);
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json("Hello world");
});

app.post("/v1/users/create", registerUser);

app.post("/v1/users/login", loginUser);

app.use("/v1/users", authenticateToken,  userRouter);

app.use("/v1/kavi", kaviRouter.kaviRouter);

app.use("/v1/articles", authenticateToken, articleRouter);

app.use("/v1/code-labs", authenticateToken, codeLabRouter);

app.use("/v1/cohorts", authenticateToken, cohortRouter);

app.use("/v1/comments", authenticateToken, commentRouter);

app.use("/v1/discussions", authenticateToken, discussionRouter);

app.use("/v1/learning-modules", authenticateToken, learningModuleRouter);


export default app;
