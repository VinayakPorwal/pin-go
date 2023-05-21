import { Button, Card } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Requests({ user }) {
  const [tasks, setTasks] = useState([]);

  const TaskRequests = async () => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const response = await fetch(api + "/projects/task-requests", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      setError(response.statusText);
      throw new Error(
        `Failed to create project: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    setTasks(data);
    console.log(tasks);
  };

  const ActionTask = async (id, status) => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const response = await fetch(api + "/projects/task-action/" + status, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ requestId: id }),
    });

    if (!response.ok) {
      setError(response.statusText);
      throw new Error(
        `Failed to create project: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
  };

  const datechange = (d) => {
    var date = new Date(d);
    const formattedDate = `${date.toLocaleDateString()} `;
    return formattedDate;
  };
  useEffect(() => {
    TaskRequests();
  }, []);
  return (
    <div>
      <h1 className=" w-[100%]  text-5xl font-bold lg:tracking-tight mx-2 my-2 p-2 border-gray-300 border-b-2">
        Requests
      </h1>
      <div>
        {tasks &&
          tasks.map((data, i) => (
            <div key={i}>
              {data.requesterId._id != user._id && (
                <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden my-2">
                  <div
                    className={`w-2 bg-gray-800 ${
                      data.status == "accepted" && "bg-green-400"
                    }  ${data.status == "rejected" && "bg-red-400"}`}
                  ></div>
                  <div className="flex items-center px-2 py-3 w-full">
                    <div className="h-full">
                      <img
                        className="w-12 h-12 object-cover rounded-full shadow"
                        src={data.requesterId.img}
                      />
                    </div>
                    <div className="mx-3 w-full">
                      <div className="flex justify-between w-full">
                        <h2 className="text-xl font-semibold text-gray-800">
                          {data.requesterId.name}
                        </h2>
                        <div className="mx-2 px-2">
                          <i className="fa-solid fa-calendar-check px-2 text-red-500"></i>
                          {datechange(data.taskId.dueDate)}
                        </div>
                      </div>
                      <p className="text-gray-600">
                        <Card className="m-2 min-w-[240px]">
                          <div className="text-gray-500 text-sm font-bold mx-2 mt-1 px-2">
                            {data.taskId.name}
                          </div>
                          <div className="mx-2 px-2">
                            {data.taskId.description}
                          </div>
                        </Card>
                        {data.status != "accepted" &&
                          data.status != "rejected" && (
                            <div className="float-right">
                              <Button
                                size="sm"
                                className="bg-red-500 mx-2"
                                onClick={() => ActionTask(data._id, "rejected")}
                              >
                                Reject
                              </Button>

                              <Button
                                size="sm"
                                className="bg-green-500 mx-2"
                                onClick={() => ActionTask(data._id, "accepted")}
                              >
                                Accept
                              </Button>
                            </div>
                          )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
