import { useState } from "react";
import post from "../../server/models/post";
import Post from "./Post";
function Postlist() {
  const [posts, setPosts] = useState([]);
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
    const handledelete = async (e) => {
      try {
        await posts.delete(`/posts/${id}`);
        setPosts(posts.filter((p) => p._id != id));
      } catch (err) {
        console.error(err.response.data.message || "erro deleting post");
      }
    };
    const handleupdate = () => {
      setPosts(posts.map((p) => (p._id == updatePost._id ? UpdatePOst : p)));
    };
  }, []);
  return (
    <>
      <div>
        {posts
          .filter((post) => post.author._id === user._id) // show only user's posts
          .map((post) => (
            <Post
              key={post._id}
              onDelete={handledelete}
              onUpdate={handleupdate}
            />
          ))}
      </div>
    </>
  );
}
export default Postlist;
