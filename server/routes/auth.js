import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findd = await User.findOne({ username });
    if (findd) {
      return res.status(400).json({ message: "user already exit" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newuser = new User({ username, password: hashed });
    newuser.save();
    res.status(201).json({ message: "registration succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "password wrong" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
export default router;
