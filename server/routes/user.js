import express from "express";
import verifytoken from "../middleware/auth.js";
import User from "../models/user.js";
const router = express.Router();
router.get("/profile", verifytoken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "error fetching profile" });
  }
});

export default router;
