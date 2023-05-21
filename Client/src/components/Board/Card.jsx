import { Card, CardBody, Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import pin from "../../assets/pin.svg";

export default function TaskCard(props) {
  const CurrentCard = useRef();
  function change(i, id) {
    if (document.getElementById(i + props.Category).style.display == "none") {
      document.getElementById(i + props.Category).style.display = "block";
      document.getElementById(id).style.transform =
        "translateY(-5px) translateX(5px) rotate(-30deg)";
    } else {
      document.getElementById(i + props.Category).style.display = "none";
      document.getElementById(id).style.transform =
        "translateY(0px) translateX(0px) rotate(0deg)";
    }
  }
  function color() {
    if (props.Category === "Pending") {
      return "bg-amber-600";
    } else if (props.Category === "In Progress") {
      return "bg-blue-500";
    } else if (props.Category === "Testing") {
      return "bg-purple-500";
    } else if (props.Category === "Complete") {
      return "bg-emerald-500";
    }
  }
  function SecondaryColor() {
    if (props.Category === "Pending") {
      return "bg-amber-100";
    } else if (props.Category === "In Progress") {
      return "bg-blue-200";
    } else if (props.Category === "Testing") {
      return "bg-purple-200";
    } else if (props.Category === "Complete") {
      return "bg-emerald-100";
    }
  }
  const datechange = (d) => {
    var date = new Date(d);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "numeric",
    };
    const formattedDate = `${date.toLocaleDateString("en-IN", options)} `;
    var difference = new Date();
    difference = date.getTime() - difference.getTime();
    difference = difference / (1000 * 60 * 60 * 24);
    difference = Math.floor(difference) + 1;
    return { formattedDate, difference };
  };

  const handleDrag = (e, id, assignedTo) => {
    if (
      assignedTo == props.user.email ||
      (assignedTo == "" && props.owner._id == props.user._id)
    ) {
      e.dataTransfer.setData("Text", id);
      return;
    }

    alert("Not authorized");
  };

  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("Text");
    updateTask(data, props.Category);
    props.setChange(data + props.Category);
    CurrentCard.current.style.border = "none";
    console.log(data);
  }

  function handleDragOver(e) {
    e.preventDefault();
    CurrentCard.current.style.border = "2px dashed black";
  }

  function handleDragLeave(e) {
    e.preventDefault();
    CurrentCard.current.style.border = "none";
  }
  async function updateTask(id, Category) {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const update = Category;
    const response = fetch(api + "/projects/task-update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ update }),
    }).then((response) => console.log(response.json()));
  }

  async function DeleteTask(id) {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    fetch(api + "/projects/task-delete/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => console.log(response.json()));
    props.setChange("delete" + id);
  }

  function clickMove(data, Category) {
    updateTask(data, Category);
    props.setChange(data + Category);
  }

  return (
    <Card
      className="w-full shadow-xl h-[320px] overflow-scroll bg-indigo-50 my-2"
      onDrop={(e) => drop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      ref={CurrentCard}
    >
      <CardBody className="px-2 py-2">
        {props.Tasks.map((Task, i) => (
          <div key={i}>
            <Button
              size="md"
              className={`flex justify-between mt-3 p-0 bg-gray-50 ${
                Task.assignedTo == props.user.email
                  ? "text-gray-900 border-2 border-blue-500"
                  : "text-black border"
              } ${
                datechange(Task.dueDate).difference < 2 && "bg-red-200"
              }  items-center shadow-xl cursor-pointer`}
              fullWidth={true}
              onClick={() => {
                change(i, `pin${Task._id}`);
              }}
              draggable
              onDragStart={(e) => handleDrag(e, Task._id, Task.assignedTo)}
            >
              <div className={`${color()} py-5 px-1 my-0 rounded-l-lg`}></div>
              <div
                className={`text-3xl text-gray-400 ml-1 my-0 rounded-l-lg cursor-grab hover:text-gray-800`}
              >
                ⁝⁝
              </div>

              <div className="mx-auto">{Task.name}</div>
              <img
                src={pin}
                id={`pin${Task._id}`}
                className="h-4 w-4 mx-1 transition-all"
              />
            </Button>
            <div
              id={i + props.Category}
              style={{ display: "none" }}
              className={`${SecondaryColor()} rounded-md p-2 shadow-lg divide-y divide-gray-500/25`}
            >
              <div className="flex justify-between items-center">
                <div className="font-bold text-xs">
                  <i className="fa-solid fa-calendar-check py-1 pr-1 text-red-500"></i>
                  {datechange(Task.dueDate).formattedDate}
                </div>
                {(Task.assignedTo == props.user.email ||
                  props.owner._id == props.user._id) && (
                  <i
                    className="fa fa-trash  hover:text-red-500"
                    onClick={() => DeleteTask(Task._id)}
                  ></i>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-700 mt-1">
                  {Task.name}
                </p>
                <p>{Task.description}</p>
              </div>
              <div>
                {Task.assignedTo != "" && (
                  <div className="flex items-center text-sm mt-2">
                    <i className="fa-solid fa-user mr-1"></i>
                    <p className="truncate">{": " + Task.assignedTo}</p>
                  </div>
                )}

                {Task.assignedTo == props.user.email && (
                  <>
                    <p className="text-sm font-bold text-gray-500 mt-2 text-center">
                      Move To:
                    </p>
                    <div className="flex justify-center">
                      {props.Category == "Pending" && (
                        <Button
                          size="sm"
                          className="py-1 mx-1 text-xs"
                          onClick={() => clickMove(Task._id, "In Progress")}
                        >
                          In Progress
                        </Button>
                      )}

                      {props.Category == "In Progress" && (
                        <>
                          <Button
                            size="sm"
                            className="py-1 mx-1 text-xs"
                            onClick={() => {
                              clickMove(Task._id, "Pending");
                            }}
                          >
                            Pending
                          </Button>
                          <Button
                            size="sm"
                            className="py-1 mx-1 text-xs"
                            onClick={() => clickMove(Task._id, "Testing")}
                          >
                            Testing
                          </Button>
                        </>
                      )}
                      {props.Category == "Testing" && (
                        <>
                          <Button
                            size="sm"
                            className="py-1 mx-1 text-xs"
                            onClick={() => {
                              clickMove(Task._id, "In Progress");
                            }}
                          >
                            In Progress
                          </Button>
                          <Button
                            size="sm"
                            className="py-1 mx-1 text-xs"
                            onClick={() => clickMove(Task._id, "Complete")}
                          >
                            Complete
                          </Button>
                        </>
                      )}
                      {props.Category == "Complete" && (
                        <Button
                          size="sm"
                          className="py-1 mx-1 text-xs"
                          onClick={() => clickMove(Task._id, "Testing")}
                        >
                          Testing
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
