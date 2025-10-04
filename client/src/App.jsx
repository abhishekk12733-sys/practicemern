import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";
import Postform from "./Postform";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Protectroute from "./Protectroute";
import PostList from "./Postlist";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Protectroute>
                <Home />
              </Protectroute>
            }
          />
          <Route
            path="/about"
            element={
              <Protectroute>
                <About />
              </Protectroute>
            }
          />
          <Route
            path="/profile"
            element={
              <Protectroute>
                <Profile />
              </Protectroute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/postform"
            element={
              <Protectroute>
                <Postform />
              </Protectroute>
            }
          />
          <Route
            path="/posts"
            element={
              <Protectroute>
                <PostList />
              </Protectroute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
