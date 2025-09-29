import express from "express";
import verifytoken from "../middleware/auth";
import User from "../models/user";
const router = express.Router();
router.get("/profile", verifytoken, async (req, res) => {
  try {
    const user = await user.findById(req.user.id).select("-password");
    req.json(user);
  } catch (err) {
    res.status(500).json({ message: "error fetching profile" });
  }
});

export default router;
