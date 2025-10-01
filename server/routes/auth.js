import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findd = User.findOne({ username });
    if (findd) {
      res.status(400).json({ message: "user already exit" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newuser = new User({ username, hashed });
    newuser.save();
    res.status(201).json({ message: "registration succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username });
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      res.status(400).json({ message: "password wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT, {
      expireIn: "1h",
    });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
export default router;
