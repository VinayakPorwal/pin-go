import React, { useEffect, useContext, useState } from "react";
import Table from "../Table/Table";
import Board from "../Board/Board";
import { useNavigate } from "react-router-dom";
import { Card } from "@material-tailwind/react";

export default function TaskProjects(props) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [Switch, setSwitch] = useState(false);

  const [change, setChange] = useState(0);

  const handleCardClick = (index) => {
    setSelectedProjectIndex(index);
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") !== "true") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const fetchProjects = async () => {
      try {
        const response = await fetch(api + "/projects/accepted", {
          headers: { Authorization: token },
        });
        const data = await response.json();
        setProjects(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, [change]);
  return (
    <>
      <h1 className="w-[100%] text-5xl font-bold lg:tracking-tight mx-2 my-2 p-2 border-gray-300 border-b-2">
        Projects
      </h1>
      <div className="w-[95%] mx-auto my-2">
        {projects.map((project, i) => (
          <div key={i} className="w-[100%] ">
            {selectedProjectIndex == null && (
              <Card
                onClick={() => handleCardClick(i)}
                className="m-4 p-2 h-[100px] w-[40%] max-w-[300px] flex flex-col justify-center cursor-pointer hover:shadow-xl"
              >
                <p className="font-bold text-gray-500">
                  <i className="fas fa-folder text-3xl mx-2 text-blue-500"></i>
                  {project.name}
                </p>
                <p className="truncate mx-2">{project.description}</p>
              </Card>
            )}

            {selectedProjectIndex === i && (
              <div className="flex justify-between w-[90%] mx-auto">
                <a
                  href="#"
                  onClick={() => setSelectedProjectIndex(null)}
                  className="items-center inline-flex  px-5 py-2 text-md text-gray-700 capitalize transition-colors duration-200 rounded-md sm:w-auto gap-x-2 hover:text-gray-400 "
                >
                  <i className="fas fa-long-arrow-alt-left"></i>
                  <span>Back</span>
                </a>
                <a
                  href="#"
                  onClick={() => setSwitch(!Switch)}
                  className="w-full text-end  px-5 py-2 text-md text-gray-700 capitalize transition-colors duration-200 rounded-md sm:w-auto gap-x-2 hover:text-gray-400 "
                >
                  <i className="fas fa-exchange-alt"></i>
                  {Switch ? (
                    <span className="bg-blue-500 text-gray-200 p-2 rounded shadow-md mx-2 text-md hover:shadow-lg">
                      <i className="fas fa-table mx-2 "></i>
                      Board
                    </span>
                  ) : (
                    <span className="bg-blue-500 text-gray-200 p-2 rounded shadow-md mx-2 text-md hover:shadow-lg">
                      <i className="fas fa-list mx-2"></i>
                      Table
                    </span>
                  )}
                </a>
              </div>
            )}
            {selectedProjectIndex === i && (
              <>
                {Switch ? (
                  <Table
                    setChange={setChange}
                    project={project}
                    user={props.user}
                  />
                ) : (
                  <Board
                    setChange={setChange}
                    project={project}
                    user={props.user}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
