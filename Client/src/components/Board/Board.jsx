import React, { useEffect, useState } from "react";
import CreateTask from "../Projects/CreateTask";
import TaskCard from "./Card";
function Board({ project, setChange, user }) {
  const [pending, setPending] = useState([]);
  const [progress, setProgress] = useState([]);
  const [testing, setTesting] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const groupedTasks = project.tasks.reduce(
      (acc, task) => {
        if (task.status === "Pending") {
          acc.pending.push(task);
        } else if (task.status === "In Progress") {
          acc.progress.push(task);
        } else if (task.status === "Testing") {
          acc.testing.push(task);
        } else if (task.status === "Complete") {
          acc.done.push(task);
        }
        return acc;
      },
      { pending: [], progress: [], testing: [], done: [] }
    );

    setPending(groupedTasks.pending);
    setProgress(groupedTasks.progress);
    setTesting(groupedTasks.testing);
    setDone(groupedTasks.done);
  }, [project]);

  return (
    <>
      {/* Card  */}

      <div className="my-2 flex flex-col items-center rounded-[20px] w-[90%] max-w-[1250px] mx-auto bg-white bg-clip-border shadow-2xl shadow-shadow-500 bg-navy-800  p-3">
        <div className="mt-2 mb-8 w-full flex justify-between items-center">
          <div>
            <h4 className="px-2 text-xl font-bold text-navy-700">
              {project.name}
            </h4>
            <p className="mt-2 px-2 text-base text-gray-600">
              {project.description}
            </p>
          </div>
          <div className="flex items-center">
            <CreateTask
              projectId={project._id}
              projectName={project.name}
              setChange={setChange}
            />

            <div className="flex flex-col items-center mx-2 ">
              <img
                src={project.userId.img}
                alt=""
                className="h-[35px] w-[35px] rounded-full border-2 border-gray shadow-lg"
              />
              <p className="my-2 px-2 text-sm text-gray-600 text-right">
                {project.userId.name}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-2 w-full ">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 bg-navy-700 ">
            <i className="mx-auto text-xl text-amber-500 fas fa-hourglass-start"></i>
            <p className="text-base font-medium text-navy-700 mx-auto">
              Pending
            </p>
            <TaskCard
              Category={"Pending"}
              Tasks={pending}
              user={user}
              owner={project.userId}
              setChange={setChange}
            />
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 ">
            <i className="mx-auto text-xl text-blue-500 fa-solid fa-bars-progress"></i>
            <p className="text-base font-medium text-navy-700 mx-auto">
              In Progress
            </p>
            <TaskCard
              Category={"In Progress"}
              Tasks={progress}
              user={user}
              owner={project.userId}
              setChange={setChange}
            />
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:bg-navy-700">
            <i className="mx-auto text-xl text-purple-500 fa-solid fa-vial-circle-check"></i>
            <p className="text-base font-medium text-navy-700 mx-auto ">
              Testing
            </p>
            <TaskCard
              Category={"Testing"}
              user={user}
              Tasks={testing}
              owner={project.userId}
              setChange={setChange}
            />
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 bg-navy-700">
            <i className="mx-auto text-xl text-emerald-500 fa fa-check"></i>
            <p className="text-base font-medium text-navy-700 mx-auto">Done</p>
            <TaskCard
              Category={"Complete"}
              Tasks={done}
              user={user}
              owner={project.userId}
              setChange={setChange}
            />
          </div>
        </div>
        <div className="text-gray-400">Drag and Drop Tasks</div>
      </div>
    </>
  );
}

export default Board;
