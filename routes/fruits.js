import express from "express";
import low from "lowdb";
import uniqid from "uniqid"

import FileSync from "lowdb/adapters/FileSync.js";
const adapter = new FileSync("./db.json");
const db = low(adapter);
db.defaults({ fruits: [] }).write();

const fruitRouter = express.Router();

fruitRouter.get("/", async (req, res) => {
  const response = await db.get("fruits").value();
  return res.status(200).send(response);
});

fruitRouter.get("/:fruit", async (req, res) => {
  const response = await db.get("fruits").find({fruit: req.params.fruit}).value();
  response !==undefined ? res.status(200).send(response) : res.status(404).send("Error not found")
});

fruitRouter.post("/", async (req, res) => {
  const response = await db
    .get("fruits")
    .push({ id: uniqid(), fruit: req.body.fruit })
    .write();
  response !== undefined
    ? res.status(201).send("Fruit added ! ")
    : res.status(500).send("Server error");
});

fruitRouter.delete("/:fruit", async (req, res) => {
  const response = await db.get("fruits").remove({ fruit: req.params['fruit'] }).write();
  console.log(response);

  return res.status(200).json("Fruit deleted !");
});

export default fruitRouter;
