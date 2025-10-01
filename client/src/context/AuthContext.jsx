import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

function Authprovider({ children }) {
  const [user, setuser] = useState(null);
  const [token, settoken] = useState(localStorage.getItem("token") || null);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token",token);
    } else {
      localStorage.removeItem("token");
    }
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
