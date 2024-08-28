import express from "express";
const app = express();
import "dotenv/config";
import connectDb from "./db/conn.js";

const port = process.env.PORT || 3060;

connectDb();

app.get("/", (req, res) => {
  res.json([
    {
      color: "red",
      value: "#f00",
    },
    {
      color: "green",
      value: "#0f0",
    },
    {
      color: "blue",
      value: "#00f",
    },
    {
      color: "cyan",
      value: "#0ff",
    },
    {
      color: "magenta",
      value: "#f0f",
    },
    {
      color: "yellow",
      value: "#ff0",
    },
    {
      color: "black",
      value: "#000",
    },
  ]);
});

app.get("/about", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
