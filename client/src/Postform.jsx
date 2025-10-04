import { useEffect } from "react";
import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [form, setform] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", form);
      navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating post");
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit} className="p-4 bg-gray-200">
        <input
          name="title"
          value={form.title}
          onChange={handlechange}
          placeholder="Enter"
          className="w-full mb-2 border bg-gray-200 rounded p-1"
        />
        <input
          name="content"
          value={form.content}
          onChange={handlechange}
          placeholder="Enter"
          className="w-full mb-2 border bg-gray-200 rounded p-1"
        />
        <button
          className="bg-amber-300 rounded-sm px-2 p-1 hover:bg-amber-400"
          type="submit"
        >
          enter
        </button>
      </form>
    </>
  );
}
export default PostForm;
