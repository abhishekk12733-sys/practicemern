import { useContext, useEffect, useState } from "react";
import API from "./api";
import { AuthContext } from "./context/AuthContext";
function Profile() {
  const [profiledata, setprofile] = useState(null);
  const { token, user } = useContext(AuthContext);
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const res = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setprofile(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || "error for fetching");
      }
    };
    if (token) {
      fetchprofile();
    }
  }, [token]);
  return (
    <>
      <div>
        {profiledata ? (
          <ul>
            <p>{profiledata.username}</p> <p>{profiledata.id}</p>
          </ul>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </>
  );
}
export default Profile;
