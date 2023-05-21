import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function CreateTask({ projectId, projectName, setChange }) {
  const [open, setOpen] = useState(false);
  const [getError, setError] = useState("");

  const [assignedTo, setAssignedTo] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleOpen = () => setOpen(!open);

  const CreateNewTask = async () => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const response = await fetch(api + "/projects/" + projectId + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, description, dueDate, assignedTo }),
    });

    if (!response.ok) {
      setError(response.statusText);
      throw new Error(
        `Failed to create project: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(data);
    setDescription("");
    setName("");
    setAssignedTo("");
    setDueDate("");
    setChange(data._id);
    handleOpen();
    return data;
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        <i className="fa fa-add mx-1"></i>
      </Button>
      <Dialog open={open} size={"xs" || "md"} handler={handleOpen}>
        <DialogHeader>
          Create task for <i className="mx-1 text-blue-400">{projectName}</i>
        </DialogHeader>
        <DialogBody divider>
          <Card className="max-w-[24rem]">
            <CardBody>
              <div className="text-red-400">{getError}</div>
              <form className=" flex flex-col gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Task Details
                </Typography>

                <Input
                  label="Task Title"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <div className="my-4 flex items-center gap-4">
                  <Textarea
                    label="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    containerProps={{ className: "min-w-[72px]" }}
                  />
                </div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Team Details
                </Typography>
                <i className="text-xs ml-1">
                  Note : It will be assigned to you by default.
                </i>
                <Input
                  type="email"
                  label="Email Address(Optional)"
                  value={assignedTo}
                  onChange={(event) => setAssignedTo([event.target.value])}
                />
                <Input
                  type="date"
                  label="Due Date"
                  value={dueDate}
                  onChange={(event) => setDueDate([event.target.value])}
                />
                {/* <Button size="lg" onClick={CreateNewTask}>
                  Add Task
                </Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  Payments are secure and encrypted
                </Typography> */}
              </form>
            </CardBody>
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              CreateNewTask();
            }}
          >
            <span>Create</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
