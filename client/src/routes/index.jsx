import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 * import Layouts
 */
import MainLayout from "../Layouts/mainLayout";

/**
 * import views
 */
import Home from "../containers/Home";
import Login from "../containers/Login";
import Register from "../containers/Register";

const Router = () => {
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
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home projects={projects} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
