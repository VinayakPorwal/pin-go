import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function CreateProject() {
  const [teamMembers, setTeamMembers] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Error, setError] = useState("");

  const createProject = async () => {
    const api = "http://localhost:5000";
    const token = sessionStorage.getItem("token");
    const response = await fetch(api + "/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name, description }),
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
    setTeamMembers("");
    return data;
  };

  return (
    <div className="">
      <h1 className="w-[100%] text-5xl font-bold lg:tracking-tight mx-2 my-2 p-2 border-gray-300 border-b-2">
        Add Project
      </h1>
      <Card className="w-full max-w-[24rem] m-4">
        <CardBody>
          <div className="text-red-400">{Error}</div>
          <form className="mt-8 flex flex-col gap-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Project Details
            </Typography>

            <Input
              label="Project Title"
              value={name}
              onChange={(event) => setName(event.target.value)}
              // icon={
              //   <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
              // }
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
            <Input
              type="email"
              label="Email Address(Optional)"
              value={teamMembers}
              onChange={(event) => setTeamMembers([event.target.value])}
            />
            <Button size="lg" onClick={createProject}>
              Add Project
            </Button>
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
            >
              <i className="fa fa-lock"></i>
              Projects are securely stored.
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
