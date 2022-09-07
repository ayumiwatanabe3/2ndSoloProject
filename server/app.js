const express = require("express");
const path = require("path");
const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile);

const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/list", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const list = await db("foods").select("*");
  res.json({ list });
});

app.post("/api/foods", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  await db("foods")
    .insert(req.body)
    .then(() => {
      res.status(201).send(req.body);
    });
});

app.patch("/api/foods", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  await db("foods").whereIn("id", req.body).del();
});

module.exports = app;
