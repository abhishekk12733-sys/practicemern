import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import About from "./About";
import Home from "./Home";
import Profile from "./Profile";
import Postform from "./Postform";
import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Protectroute from "./Protectroute";
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
          <Route
            path="/login"
            element={
              <Protectroute>
                <Login />
              </Protectroute>
            }
          />
          <Route
            path="/signup"
            element={
              <Protectroute>
                <Signup />
              </Protectroute>
            }
          />
          <Route
            path="/postprofile"
            element={
              <Protectroute>
                <Postform />
              </Protectroute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
