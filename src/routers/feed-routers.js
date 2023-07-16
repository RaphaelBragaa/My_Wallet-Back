import express from "express";
import { postCash, getCash } from "../controllers/cash-controller.js";
import { validateSessionByToken } from "../middlewares/authorization.middlewares.js";

const FeedRouter = express.Router();
FeedRouter.all("/*", validateSessionByToken)
  .post("/cash", postCash)
  .get("/cash", getCash);

export default FeedRouter;
