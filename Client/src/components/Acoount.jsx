import { useState, useEffect } from "react";
import Help from "./help";
import Sidenav from "./navbar/Sidenav";
import Requests from "./Notification";
import CreateProject from "./Projects/CreateProject";
import ProjectList from "./Projects/ProjectList";
import TaskProjects from "./Projects/TaskProjects";

export default function Account() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const response = await fetch(api + "/auth/getuser", {
          headers: { Authorization: `${token}` },
        });
        const data = await response.json();
        setUser(data);
        console.log(data, user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
  const [Tab, setTab] = useState(1);
  return (
    <>
      <div className="flex max-h-[100vh] overflow-scroll">
        <Sidenav Tab={Tab} setTab={setTab} user={user} />
        <div className="mx-auto overflow-scroll  w-[80%]">
          {Tab == 1 && <ProjectList user={user} />}
          {Tab == 2 && <CreateProject />}
          {Tab == 3 && <Requests user={user} />}
          {Tab == 4 && <TaskProjects user={user} />}
          {Tab == 5 && <Help />}
        </div>
      </div>
    </>
  );
}
