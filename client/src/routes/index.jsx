import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 * import Layouts
 */
import MainLayout from "../containers/Layouts/MainLayout";
import UserLayout from "../containers/Layouts/UserLayout";

/**
 * import views
 */
import Home from "../containers/Views/Home";
import Login from "../containers/Views/Login";
import Register from "../containers/Views/Register";
import Dashboard from "../containers/Views/Dashboard";

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
          <Route path="/dashboard" element={<UserLayout />}>
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
