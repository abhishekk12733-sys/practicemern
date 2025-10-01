import { useEffect } from "react";
import { useState } from "react";
import API from "./api";
import { Navigate } from "react-router-dom";

function PostForm() {
  const [form, setform] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", form);
      Navigate("/posts");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating post");
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handlechange}
          placeholder="enter"
        />
        <input
          name="content"
          value={form.content}
          onChange={handlechange}
          placeholder="enter"
        />
        <button type="submit">enter</button>
      </form>
    </>
  );
}
export default PostForm;
