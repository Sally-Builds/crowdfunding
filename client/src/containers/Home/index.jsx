import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import Cards from "./Cards";
import Header from "../../components/Header";

const Home = ({ projects }) => {
  return (
    <>
      <Header />
      <div className="grid">
        <main className="m-12">
          <header className="border-b-2">
            <h2 className="text-6xl font-bold text-gray-600 font-body">
              Futo Crowdfunding
            </h2>
            <h3 className="text-6md text-gray-700 font-light">
              Lets bring back the glory days
            </h3>
          </header>

          <div className="mt-12">
            <div className="flex justify-start">
              <CalendarIcon className="w-4 inline-block mr-2 stroke-secondary-200"></CalendarIcon>
              <h4 className="text-primary">Upcoming Crowdfunding</h4>
            </div>

            {/* cards go here */}
            <Cards projects={projects} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
