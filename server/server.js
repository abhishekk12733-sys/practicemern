import express from "express";
import cros from "cros";
import mongoose from "moongode";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cros());
app.use(express.json());

app.use("/auth", auth );
app.use("/posts", postroutes);

mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("mongoose connect"))
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
