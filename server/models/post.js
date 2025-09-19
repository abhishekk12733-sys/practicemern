import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.type.ObjectID, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
