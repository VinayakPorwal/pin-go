import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import CreateTask from "../Projects/CreateTask";
import Dropdown from "./Dropdown";

function Table({ project, setChange }) {
  const datechange = (d) => {
    var date = new Date(d);
    const formattedDate = `${date.toLocaleDateString()} `;
    return formattedDate;
  };
  function SecondaryColor(Category) {
    if (Category === "Pending") {
      return "text-amber-500 bg-amber-100/60";
    } else if (Category === "In Progress") {
      return "text-blue-500 bg-blue-100/60";
    } else if (Category === "Testing") {
      return "text-purple-500 bg-purple-100/60";
    } else if (Category === "Complete") {
      return "text-emerald-500 bg-emerald-100/60";
    }
  }
  return (
    <section className="container px-4 mx-auto my-4 w-[90%] max-[1250px]">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-900 ">
              {project.name}
            </h2>

            <span className="px-3 py-1 text-xs bg-blue-600 text-gray-50 rounded-full ">
              {"By - " + project.userId.name}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-700 ">{project.description}</p>
        </div>

        <div className="flex items-center mt-4 gap-x-3">
          <CreateTask
            projectId={project._id}
            projectName={project.name}
            setChange={setChange}
          />
          <Select label="Sort By" className="py-2 bg-white divider-x">
            <Option className="my-2 px-5 bg-blue-50 py-2 w-full  text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm hover:bg-gray-100">
              View all
            </Option>
            <Option className="my-2 px-5 bg-blue-50 py-2 w-full text-xs font-medium text-amber-500 sm:text-sm hover:bg-gray-100">
              Pending
            </Option>
            <Option className="my-2 px-5 bg-blue-50 py-2  w-full text-xs font-medium text-blue-500 transition-colors duration-200 sm:text-sm  hover:bg-gray-100">
              In Progress
            </Option>
            <Option className="my-2 px-5 py-2  bg-blue-50 w-full text-xs font-medium text-purple-500 transition-colors duration-200 sm:text-sm hover:bg-gray-100">
              Testing
            </Option>
            <Option className="my-2 px-5 bg-blue-50 py-2 w-full text-xs font-medium text-emerald-500 transition-colors duration-200 sm:text-sm  hover:bg-gray-100">
              Completed
            </Option>
          </Select>
          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search"
              className="block max-w-[200px] py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-3 focus:outline-none">
                        <span>Tasks</span>
                        <i className="fas fa-sort-alpha-down"></i>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      About
                    </th>
                    {/* 
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      Users
                    </th> */}

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
                    >
                      Progress
                    </th>

                    {/* <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {project.tasks &&
                    project.tasks.map((taskData, i) => (
                      <tr key={i}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap max-w-md ">
                          <div>
                            <h2 className="font-medium text-gray-800">
                              {taskData.name}
                            </h2>
                            <p
                              className="text-sm font-normal text-gray-600 truncate cursor-pointer"
                              title={taskData.description}
                            >
                              {taskData.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div
                            className={`inline px-3 py-1 text-sm font-normal rounded-full border ${SecondaryColor(
                              taskData.status
                            )} gap-x-2`}
                          >
                            {taskData.status}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 className="text-gray-700 ">
                              {taskData.assignedTo}
                            </h4>
                            <p className="text-gray-500 ">
                              Due date: {datechange(taskData.dueDate)}
                            </p>
                          </div>
                        </td>
                        {/* <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center">
                            {taskData.assignedTo.map((alt, i) => (
                              <img
                                className="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                                alt={alt}
                                key={i}
                              />
                            ))}

                            <p className="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                +4
                              </p>
                          </div>
                        </td> */}

                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="w-48 h-1.5 bg-blue-100 overflow-hidden rounded-full">
                            <div
                              className={`bg-blue-500 
                              ${taskData.status == "Pending" && "w-0"} ${
                                taskData.status == "In Progress" && "w-2/4"
                              } ${taskData.status == "Testing" && "w-3/4"} ${
                                taskData.status == "Complete" && "w-4/4"
                              }
                              h-1.5`}
                            ></div>
                          </div>
                        </td>
                        {/* 
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <button className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                              />
                            </svg>
                          </button>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Table;
