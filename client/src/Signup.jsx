import { useState } from "react";
import API from "./api";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
const navigate = useNavigate();

function Signup() {
  const [form, setform] = useState({ username: "", password: "" });
  const [setuser, settoken] = useContext(AuthContext);
  const handlechnage = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.prevenDefault();
    try {
      await API.post("/auth/signup", form);
      const res = API.post("./auth/login", form);
      setuser(res.data.user);
      settoken(res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "signup failed");
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handlesubmit}>
          <input
            name="username"
            value={form.username}
            onChange={handlechnage}
            placeholder="enter username"
          />
          <input
            name="password"
            value={form.password}
            onChange={handlechnage}
            placeholder="enter password"
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}
export default Signup;
