import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
import API from "../api.js";
function Authprovider({ children }) {
  const [user, setuser] = useState(null);
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        localStorage.setItem("token", token);
        try {
          const res = await API.get("/user/profile");
          setuser(res.data);
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
          settoken(null);
          setuser(null);
          localStorage.removeItem("token");
        }
      } else {
        localStorage.removeItem("token");
        setuser(null);
      }
    };
    loadUser();
  }, [token]);
  return (
    <>
      <AuthContext.Provider value={{ user, setuser, token, settoken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
export default Authprovider;
