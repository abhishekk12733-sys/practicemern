import express from "express";
import Post from "../models/post";
import { verifytoken } from "../middleware/auth";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newpost = new Post({ title, content, user: req.user.id });
    await newpost.save();
    res.status(200).json(newpost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("user", "username");
  res.json(posts);
});
router.put("/:id", { verifytoken }, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      res.status(403).json({ message: "not authorize" });
    }
    post.title = req.body.title;
    post.content = req.body.title;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", { verifytoken }, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
