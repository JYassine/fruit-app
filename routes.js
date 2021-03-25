import express from "express";

const publicRouter = express.Router();
import fruitRouter from "./routes/fruits.js";

publicRouter.use("/fruits", fruitRouter);

// module.exports = publicRouter;
export default publicRouter;
