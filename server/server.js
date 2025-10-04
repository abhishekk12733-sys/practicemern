import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import postroutes from "./routes/post.js";
import userroutes from "./routes/user.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", auth);
app.use("/posts", postroutes);
app.use("/user", userroutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose connect"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
