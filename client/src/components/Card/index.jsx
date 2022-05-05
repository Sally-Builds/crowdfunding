import React from "react";
import { ClipboardCopyIcon, ClockIcon } from "@heroicons/react/outline";
import basketball from "../../assets/img/basketball.jpeg";
import toilet from "../../assets/img/toilet.jpeg";
import lab from "../../assets/img/lab.jpeg";

const Card = ({ project }) => {
  return (
    <>
      <div className="card">
        <img src={`${project.img}`} alt="" className="card-image" />
        <div className="m-4">
          <span className="font-bold text-body text-gray-500">
            {project.name}
          </span>
          <span className="block text-sm font-extralight">
            by 0xa930d390dee9900deac33{" "}
            <ClipboardCopyIcon className="cursor-pointer stroke-primary w-4 inline-block"></ClipboardCopyIcon>
          </span>
          <div className="border-2 border-secondary-300 bor my-2">
            <div className="border-2 w-1/6 border-green-500"></div>
          </div>
          <div className="badge">
            <ClockIcon className="w-4 inline-block stroke-white"></ClockIcon>{" "}
            <span className="text-xs text-white font-bold">3 days left</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
