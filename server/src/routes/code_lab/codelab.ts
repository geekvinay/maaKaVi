import { Router } from "express";
import {
  createCodelab,
  getCodelab,
  updateCodelab,
} from "../../controllers/code_lab/code_lab";

const codeLabRouter = Router();

codeLabRouter.post("/", createCodelab);
codeLabRouter.get("/:codelabId", getCodelab);
codeLabRouter.put("/:codelabId", updateCodelab);

export default codeLabRouter;
