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

import { formatResponse } from "./utils/res-transformer/res-transformer";

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

app.use("/v1/kavi", kaviRouter.kaviRouter);

app.use("/v1/code-lab", codeLabRouter);

app.use("/v1/cohorts", cohortRouter);

app.use("/v1/comments", commentRouter);

app.use("/v1/discussions", discussionRouter);

app.use("/v1/learning-modules", learningModuleRouter);


export default app;
