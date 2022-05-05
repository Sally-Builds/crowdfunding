import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home/index";
import Login from "./containers/Login/index";
import Register from "./containers/Register/index";

import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:9000/projects");
      return res.data;
    } catch (error) {
      return [];
    }
  };

  const getProjects = async () => {
    const projects = await fetchProjects();
    setProjects(projects);
  };

  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home projects={projects} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
