import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import "dotenv/config";
import connectDb from "./db/conn.js";
import userRouter from "./routes/user.routes.js";

// webjobportal
const port = process.env.PORT || 3060;

connectDb();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/v1", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
