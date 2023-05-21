import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarUI from "../navbar/navbar";
import Logo from "../../assets/boy.svg";
import Table from "../Table/Table";
import Board from "../Board/Board";
import { Button } from "@material-tailwind/react";
import Features from "./Features";
import Testimonials from "./Testimonials";

function Dashboard() {
  const project = {
    _id: "64049bc9ed0b26ab507bc9be",
    name: "Project 1",
    description: "This is a test project",
    teamMembers: ["johndoe2@example.com", "johndoe3@example.com"],
    userId: {
      _id: "64048f6d2e75d05cbde1c573",
      name: "John Doe",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLDIKy0LBlpzShkum_DqvbDk3IspLtAQWnqQ&usqp=CAU",
      email: "johndoe@example.com",
      __v: 0,
    },
    tasks: [
      {
        _id: "6404a11b21d37fa37011fe62",
        name: "Task 1",
        description: "This is a test task",
        assignedTo: ["johndoe2@example.com"],
        dueDate: "2021-10-01T00:00:00.000Z",
        status: "Pending",
        project: "64049bc9ed0b26ab507bc9be",
        __v: 0,
      },
      {
        _id: "6404a22494c98a3721e506a5",
        name: "Task 2",
        description: "This is a test task",
        assignedTo: ["johndoe3@example.com"],
        dueDate: "2021-10-01T00:00:00.000Z",
        status: "In Progress",
        project: "64049bc9ed0b26ab507bc9be",
        __v: 0,
      },
    ],
    __v: 0,
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("loggedIn") == "true") {
      navigate("/Account");
    }
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-5">
        <NavbarUI />

        <main className="grid lg:grid-cols-2 place-items-center pt-6 pb-6 md:pt-4 ">
          <div className="py-6 md:order-1 hidden md:block">
            <img
              src={Logo}
              alt="Astronaut in the air"
              style={{ padding: "1.5rem" }}
            />
            {/* <Logo /> */}
          </div>

          <div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight">
              Tracking tasks with <i className="text-amber-600  font-mono">P</i>
              <i className="text-blue-500 font-mono">i</i>
              <i className="text-purple-600 font-mono">n</i>
              <i className="text-emerald-600 font-mono">-GO</i>
            </h1>
            <p className="text-lg mt-4 text-slate-600 max-w-xl">
              Track your tasks and projects like never before with Pin-GO. You
              can quickly start with it by just log in to you account.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </main>
        <Features />

        <div>
          <h1 className="w-[80%] text-7xl font-bold lg:tracking-tight mx-auto text-center">
            <p className="w-[80%] text-4xl font-bold text-amber-500">
              Play with
            </p>{" "}
            Board
          </h1>
          <Board project={project} user={project.userId} />
          <h1 className="w-[80%] text-7xl font-bold lg:tracking-tight mx-auto text-center mt-20">
            <p className="w-[80%] text-4xl font-bold text-emerald-500">
              Search in
            </p>{" "}
            List
          </h1>
          <Table project={project} />
        </div>
        <h1 className="w-[80%] text-7xl font-bold lg:tracking-tight mx-auto text-center mt-20">
          <p className="w-[80%] text-4xl font-bold text-purple-500">
            Overwhelming
          </p>{" "}
          Responses
        </h1>
        <Testimonials />
      </div>
    </>
  );
}

export default Dashboard;
