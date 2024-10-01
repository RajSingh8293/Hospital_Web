import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import connectDb from "./db/conn.js";
import "dotenv/config";
import { error } from "./utils/error.js";

const app = express();
// webjobportal
const port = process.env.PORT || 3060;

// handling uncaught error
process.on("uncaughtException", (err) => {
  console.log("Shut down server due to :", err.message);
});

const corsOptions = {
  origin: "https://hospital-web-frontend.vercel.app",
  // origin: "http://localhost:5173",
  credentials: true,
};
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(error);

// just for test
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// routes
app.use("/api/v1", userRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
