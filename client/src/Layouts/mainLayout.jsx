import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const mainLayout = ({ children }) => {
  return (
    <div className="grid">
      <Header />
      <main>
        {/* {children} */}
        <Outlet />
      </main>
    </div>
  );
};

export default mainLayout;
