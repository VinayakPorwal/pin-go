import { Card } from "@material-tailwind/react";
import React from "react";

export default function Features() {
  const features = [
    {
      Head: "Project Management",
      icon: "fa fa-folder",
      desc: "The task management system allows users to create, assign, and track tasks in real-time, ensuring efficient project management.",
    },
    {
      Head: "Collaboration",
      icon: "fa fa-handshake",
      desc: "The project provides an efficient platform for teams to collaborate and work together on various tasks and projects.",
    },
    {
      icon: "fa fa-user-lock",
      Head: "Authentication",
      desc: "The user authentication system ensures secure access to the platform, with password encryption and verification to prevent unauthorized access.",
    },
  ];
  return (
    <div className="mb-12">
      <h1 className="w-[80%] text-6xl font-bold lg:tracking-tight mx-auto text-center">
        <p className="w-[80%] text-4xl font-bold text-gray-700">Why</p>
        <i className="text-amber-600  font-mono">P</i>
        <i className="text-blue-500 font-mono">i</i>
        <i className="text-purple-600 font-mono">n</i>
        <i className="text-emerald-600 font-mono">-GO</i>
        <i>?</i>
      </h1>
      <div className="flex">
        {features.map((data, i) => (
          <Card className="w-1/3 m-4 text-center bg-transparent p-4" key={i}>
            <i className={`${data.icon} text-4xl text-blue-600`}></i>
            <p className="text-gray-800 text-2xl my-2">{data.Head}</p>
            <p className="text-base text-gray-600"> {data.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
