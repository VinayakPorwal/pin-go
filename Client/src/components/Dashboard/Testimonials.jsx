import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import React from "react";

export default function Testimonials() {
  return (
    <div className="mx-auto flex justify-center mt-8">
      <Card className="w-full max-w-[26rem] px-4 py-2 m-2">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="candice wu"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Candice Wu
              </Typography>
              <div className="5 flex items-center gap-0">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <Typography color="blue-gray">Frontend Lead @ Google</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-2">
          <Typography>
            &quot;I found solution to all my design needs from Creative Tim. I
            use them as a freelancer in my hobby projects for fun! And its
            really affordable, very humble guys !!!&quot;
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
