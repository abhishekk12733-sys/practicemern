import { useEffect, useState, useContext } from "react";
import API from "./api.js"; // <-- your axios instance (adjust path)
import Post from "./Post.jsx";
import { AuthContext } from "./context/AuthContext";

function PostList() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching posts");
      }
    };
    fetchPosts();
  }, []);

  // delete post
  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err.response?.data?.message || "Error deleting post");
    }
  };

  // update post
  const handleUpdate = (updatedPost) => {
    setPosts(posts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <div>
      {posts
        .filter((post) => user && post.user && post.user._id === user._id) // show only user's posts
        .map((post) => (
          <Post
            key={post._id}
            post={post}
            onDelete={() => handleDelete(post._id)}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
}

export default PostList;
