import React from "react";
import Card from "../../../components/Card/index";

const Cards = ({ projects }) => {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-10 mt-10">
        {projects.map((project) => (
          <Card project={project} key={project.name} />
        ))}
      </div>
    </>
  );
};

export default Cards;
