import express from "express";
import routes from "./routes.js";

import dotenv from "dotenv";
const dotenvConfig = dotenv.config();
import cors from "cors";

import bodyParser from "body-parser";

if (dotenvConfig.error) {
  throw dotenvConfig.error;
}
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
