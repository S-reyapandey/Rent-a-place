import express from "express";
import dotenv from "dotenv";
import roomRouter from "./routes/roomRoute.js";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requestes-With, Content-Type, Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to out API" }));
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('connect to db');

    app.listen(port, () => console.log(`Server is running on port : ${port}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();
