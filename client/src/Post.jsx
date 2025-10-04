import { useState } from "react";
import API from "./api.js";

function Post({ post, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: post.title,
    content: post.content,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/posts/${post._id}`, form);
      onUpdate(res.data); // update post in parent
      setIsEditing(false);
    } catch (err) {
      console.error(err.response?.data?.message || "Error updating post");
    }
  };

  return (
    <div className="border p-4 rounded mb-3 bg-gray-100">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="border p-2 rounded mb-2 w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white py-1 px-3 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white py-1 px-3 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(post._id)}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
