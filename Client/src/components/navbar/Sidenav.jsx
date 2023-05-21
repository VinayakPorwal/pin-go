import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
export default function Sidenav({ Tab, setTab, user }) {
  const { logout } = useContext(AuthContext);
  let navigate = useNavigate();
  const Tasks = () => {
    setTab(4);
  };
  const Help = () => {
    setTab(5);
  };
  const Request = () => {
    setTab(3);
  };
  const Projects = () => {
    setTab(1);
  };
  const AddProjects = () => {
    setTab(2);
  };

  const Logout = () => {
    logout();
    navigate("/");
  };

  const navs = [
    {
      name: "Projects",
      //   route: "/",
      func: Projects,
      icon: "fa fa-folder-tree",
    },
    {
      name: "New Project",
      //   route: "/",
      func: AddProjects,
      icon: "fa fa-folder-plus",
    },
    {
      name: "Requests",
      //   route: "/",
      func: Request,
      icon: "fa fa-code-pull-request",
    },
    {
      name: "Tasks",
      //   route: "/",
      func: Tasks,
      icon: "fa fa-thumbtack",
    },
    {
      name: "Help",
      //   route: "/",
      func: Help,
      icon: "fas fa-info-circle",
    },
    {
      name: "Logout",
      //   route: "/",
      func: Logout,
      icon: "fas fa-sign-out-alt",
    },
  ];

  return (
    <>
      <div id="view" className="h-full  flex flex-row">
        <div
          id="sidebar"
          className="relative bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        >
          <div className="space-y-6 md:space-y-10 mt-10 ">
            <h1 className="font-bold text-4xl text-center md:hidden">
              D<span className="text-teal-600">.</span>
            </h1>
            <h1 className="hidden md:block font-bold text-md md:text-xl text-center">
              <i className="text-amber-600  font-mono">P</i>
              <i className="text-blue-500 font-mono">i</i>
              <i className="text-purple-600 font-mono">n</i>
              <i className="text-emerald-600 font-mono">-GO</i>
              <span className="text-teal-600">.</span>
            </h1>
            <div id="profile" className="space-y-3">
              <img
                src={user.img}
                // src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Avatar user"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-blue-400">
                  {user.name}
                </h2>
                <p className="text-xs text-gray-500 text-center">
                  {user.email}
                </p>
              </div>
            </div>

            <div id="menu" className="flex flex-col space-y-2">
              {navs.map((nav, i) => (
                <div
                  onClick={nav.func}
                  key={i}
                  className={` cursor-pointer text-sm font-medium text-gray-700 py-2 px-2 ${
                    Tab == i + 1 && "bg-blue-400 text-white text-base"
                  } hover:bg-blue-400 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out`}
                >
                  <i className={`${nav.icon} text-lg mx-2`}></i>
                  <span className="">{nav.name}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 w-full text-center">
              © {new Date().getFullYear()} | Pin-GO™
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
